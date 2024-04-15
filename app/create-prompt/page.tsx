"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/create-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            setSubmitting(false);
            if (response.ok) {
                const { id } = await response.json();
                router.push(`/prompt/${id}`);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error('Failed to create prompt:', error);
            setSubmitting(false);
        }
    }

    return (
        <Form 
            type="Create"
            post={post}
            submitting={submitting}
            setPost={setPost}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt
