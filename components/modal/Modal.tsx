"use client"
import { useState, ReactNode, forwardRef, useImperativeHandle } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalComponentProps {
  children: ReactNode;
}

export type ModalComponentRefProps = {
  openModal: () => void
  closeModal: () => void
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-h-screen max-w-md p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {children}
      </div>
    </div>
  );
};

export const ModalComponent = forwardRef<ModalComponentRefProps, ModalComponentProps>(
  function ModalComponent ({ children }, ref) {
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    useImperativeHandle(ref, () => {
      return {
        openModal,
        closeModal,
      };
    }, []);
  
    return (
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {children}
      </Modal>
    )
  }
)