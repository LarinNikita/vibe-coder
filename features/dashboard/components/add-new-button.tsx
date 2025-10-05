'use client';

import { useState } from 'react';

import Image from 'next/image';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { createPlayground } from '../actions';
import TemplateSelectionModal from './template-selection-modal';

import { Button } from '@/components/ui/button';

const AddNewButton = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    title: string;
    template: 'REACT' | 'NEXTJS' | 'EXPRESS' | 'VUE' | 'HONO' | 'ANGULAR';
    description?: string;
  } | null>(null);

  const handleSubmit = async (data: {
    title: string;
    template: 'REACT' | 'NEXTJS' | 'EXPRESS' | 'VUE' | 'HONO' | 'ANGULAR';
    description?: string;
  }) => {
    setSelectedTemplate(data);
    const res = await createPlayground(data);
    toast('Playground created successfully');
    // Here you would typically handle the creation of a new playground
    // with the selected template data
    console.log('Creating new playground:', data);
    setIsModalOpen(false);
    router.push(`/playground/${res?.id}`);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer transition-all duration-300 ease-in-out hover:bg-background hover:border-[#e93f3f] hover:scale-[1.02] shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(233,63,63,0.15)]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant="outline"
            className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#e93f3f] group-hover:text-[#e93f3f] transition-colors duration-300"
            size="icon"
          >
            <Plus
              size={30}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#e93f3f]">Add New</h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">
              Create a new Playground
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden">
          {/* TODO Fix images */}
          <Image
            src="/add-new.svg"
            alt="Create new Playground"
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <TemplateSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddNewButton;
