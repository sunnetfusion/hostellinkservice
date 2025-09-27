'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const formSchema = z.object({
  bankName: z.string().min(2, { message: 'Bank name must be at least 2 characters.' }),
  accountNumber: z.string().min(10, { message: 'Account number must be at least 10 digits.' }),
  accountName: z.string().min(2, { message: 'Account name must be at least 2 characters.' }),
});

interface PayoutDetailsFormProps {
  onNext: (data: any) => void;
  onPrev: () => void;
}

export function PayoutDetailsForm({ onNext, onPrev }: PayoutDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: '',
      accountNumber: '',
      accountName: '',
    },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payout Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Guaranty Trust Bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="0123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
