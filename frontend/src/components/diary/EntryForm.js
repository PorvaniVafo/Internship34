import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createEntry, updateEntry } from '../api/diaryApi';
import { uploadImage, deleteImage } from '../api/imageApi'; // Импортируем API для изображений
import ImageUpload from './ImageUpload';

const EntryForm = ({ entryId, existingTitle = '', existingContent = '', existingImageUrl = '', onSave }) => {
    const [title, setTitle] = useState(existingTitle);
    const [content, setContent] = useState(existingContent);
    const [imageUrl, setImageUrl] = useState(existingImageUrl); // Хранение URL изображения
    const [loading, setLoading] = useState(false); // Состояние загрузки изображения
    const [error, setError] = useState(null); // Состояние ошибки


    const handleImageUpload = async (file) => {
        setLoading(true);
        setError(null);
        try {
            const data = await uploadImage(entryId, file);
            setImageUrl(data.imageUrl);
        } catch (err) {
            setError('Ошибка при загрузке изображения');
        } finally {
            setLoading(false);
        }
    };

    // Обработчик удаления изображения
    const handleDeleteImage = async () => {
        try {
            await deleteImage(entryId);
            setImageUrl(null); // Убираем изображение после удаления
        } catch (err) {
            setError('Ошибка при удалении изображения');
        }
    };

    // Обработчик сохранения записи
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert('Title and content cannot be empty!');
            return;
        }

        const entry = { title, content, imageUrl }; // Добавляем URL изображения
        try {
            if (entryId) {
                await updateEntry(entryId, entry);
            } else {
                await createEntry(entry);
            }
            onSave(); // уведомляем родительский компонент о сохранении
        } catch (error) {
            alert('Failed to save entry');
        }
    };

    useEffect(() => {
        if (entryId) {
            setTitle(existingTitle);
            setContent(existingContent);
            setImageUrl(existingImageUrl); // Подгружаем изображение при редактировании записи
        }
    }, [entryId, existingTitle, existingContent, existingImageUrl]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength="100"
            />
            <ReactQuill value={content} onChange={setContent} />

            {/* Компонент загрузки изображений */}
            <ImageUpload onUpload={handleImageUpload} loading={loading} error={error} />

            {/* Отображение изображения, если оно есть */}
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="Diary Entry" width={100} />
                    <button type="button" onClick={handleDeleteImage}>Удалить изображение</button>
                </div>
            )}

            <button type="submit">Save Entry</button>
        </form>
    );
};

export default EntryForm;
