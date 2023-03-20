import React, { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div
          className="fixed z-50 w-screen bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center items-center"
          onClick={props.toggle}
        >
          <div
            className="block bg-white w-200 h-140 p-9 rounded-lg 
    fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
