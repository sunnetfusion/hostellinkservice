'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  photos: z.any(),
});

interface PhotoUploadFormProps {
  onNext: (data: { photos: string[] }) => void;
  onPrev: () => void;
}

export function PhotoUploadForm({ onNext, onPrev }: PhotoUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    const files = Array.from(data.photos);
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file as File);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          uploadedUrls.push(result.url);
        } else {
          // Handle upload error for a single file
          console.error('Upload failed for one of the files');
        }
      } catch (error) {
        console.error('An error occurred during upload', error);
      }
    }

    setIsUploading(false);
    onNext({ photos: uploadedUrls });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hostel Photos</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload at least 3 photos</FormLabel>
                <FormControl>
                  <Input type="file" multiple {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrev} disabled={isUploading}>
              Previous
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isUploading ? 'Uploading...' : 'Submit for Review'}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
