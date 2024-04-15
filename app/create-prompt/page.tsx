"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();
    const router = useRouter()
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });
            if (response.ok) {
                router.push(`/`);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error('Failed to create prompt:', error);
        } finally {
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
