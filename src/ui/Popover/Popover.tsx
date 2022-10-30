import { forwardRef, ReactNode, RefObject, useRef } from "react";
import {
  DismissButton,
  FocusScope,
  mergeProps,
  useModal,
  useOverlay,
  OverlayContainer,
  useOverlayTrigger,
  useOverlayPosition,
  useDialog
} from "react-aria";

import { useOverlayTriggerState } from "react-stately";

// Reuse the Button from your component library. See below for details.

export const Popover = forwardRef(
  (
    {
      title,
      children,
      isOpen,
      onClose,
      ...otherProps
    }: {
      title: string;
      children: ReactNode;
      isOpen: boolean;
      onClose: () => void;
    },
    ref
  ) => {
    const { overlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable: true
      },
      ref as RefObject<Element>
    );

    const { modalProps } = useModal();

    // const { dialogProps, titleProps } = useDialog({}, ref as RefObject);

    return (
      <div
        {...mergeProps(overlayProps, otherProps, modalProps)}
        ref={ref}
        style={{
          background: "white",
          color: "black",
          padding: 30
        }}
      >
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    );
  }
);

export const Example = () => {
  const state = useOverlayTriggerState({});

  const triggerRef = useRef(null);
  const overlayRef = useRef(null);

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  // Get popover positioning props relative to the trigger
  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "top",
    offset: 5,
    isOpen: state.isOpen
  });

  return (
    <div>
      <button {...triggerProps} ref={triggerRef}>
        Open Popover
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <Popover
            {...overlayProps}
            {...positionProps}
            ref={overlayRef}
            title="Popover title"
            isOpen={state.isOpen}
            onClose={state.close}
          >
            This is the content of the popover.
          </Popover>
        </OverlayContainer>
      )}
    </div>
  );
};
