'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(5, { message: 'Hostel name must be at least 5 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  facilities: z.string().min(10, { message: 'Please list at least a few facilities.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  distance: z.coerce.number().positive({ message: 'Distance must be a positive number.' }),
});

interface HostelInfoFormProps {
  onNext: (data: any) => void;
  onPrev: () => void;
}

export function HostelInfoForm({ onNext, onPrev }: HostelInfoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      facilities: '',
      description: '',
      distance: 0,
    },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hostel Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hostel Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Elite Student Lodge" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (per year)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 250000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facilities</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., WiFi, AC, Security, Kitchen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="A brief description of the hostel..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance from main campus (in km)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 1.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
