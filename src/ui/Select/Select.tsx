import { ReactNode, type Key, useRef, RefObject } from "react";
import {
  AriaListBoxOptions,
  AriaSelectOptions,
  HiddenSelect,
  mergeProps,
  useButton,
  useFocusRing,
  useListBox,
  useOption,
  useOverlay,
  useOverlayPosition,
  useSelect
} from "react-aria";
import { SelectState, useSelectState, Item } from "react-stately";
import styled from "styled-components";
import { palette } from "../colors";

type OptionProps<T> = {
  isFirst: boolean;
  isLast: boolean;
  itemKey: Key;
  itemRendered: ReactNode;
  state: SelectState<T>;
};

const Li = styled.li`
  padding: 8px;
  outline-style: none;
  box-sizing: border-box;
  cursor: pointer;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const Option = <T,>({
  itemKey,
  state,
  itemRendered,
  isFirst,
  isLast
}: OptionProps<T>) => {
  const ref = useRef(null);
  const isSelected = state.selectionManager.isSelected(itemKey);
  const isFocused = state.selectionManager.focusedKey === itemKey;

  const { optionProps } = useOption(
    {
      key: itemKey,
      isDisabled: false,
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true
    },
    state,
    ref
  );

  return (
    <Li {...optionProps} ref={ref}>
      {itemRendered}
    </Li>
  );
};

type ListBoxPopoverProps<T> = {
  state: SelectState<T>;
  targetRef: RefObject<HTMLElement>;
};

const ListBoxContainer = styled.div<{ placement: string }>`
  z-index: 1000;
  position: absolute;
  width: 100%;
  ${(props) => (props.placement === "top" ? "bottom: 40px" : "top: 40px")}
`;
const ListBoxUl = styled.ul`
  margin: 0;
  padding: 0;
  border-width: 0;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
  list-style-type: none;
  box-shadow: ${palette.black} 0 0 0 3px;
`;

const ListBoxPopover = <T extends object>(
  props: AriaListBoxOptions<unknown> & ListBoxPopoverProps<T>
) => {
  const { state, targetRef, ...restProps } = props;

  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { listBoxProps } = useListBox(
    {
      autoFocus: state.focusStrategy,
      disallowEmptySelection: true,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      shouldUseVirtualFocus: true,
      ...restProps
    },
    state,
    listBoxRef
  );

  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true
    },
    popoverRef
  );

  const { placement } = useOverlayPosition({
    targetRef: targetRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen
  });

  const collections = [...state.collection];

  return (
    <ListBoxContainer placement={placement} {...overlayProps} ref={popoverRef}>
      <ListBoxUl {...listBoxProps} ref={listBoxRef}>
        {collections.map((item, index) => {
          return (
            <Option
              key={item.key}
              itemKey={item.key}
              itemRendered={item.rendered}
              state={state}
              isFirst={index === 0}
              isLast={index === collections.length - 1}
            />
          );
        })}
      </ListBoxUl>
    </ListBoxContainer>
  );
};

type SelectProps = {
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
};

const SelectContainer = styled.div`
  position: relative;
  display: grid;
`;
const SelectButton = styled.button`
  border-radius: 4px;
  padding: 16px;
  border-width: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline-style: none;
  max-height: 48px;
  box-sizing: border-box;
  overflow: hidden;
`;
const SelectCaption = styled.span`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Select = <T extends object>(
  props: AriaSelectOptions<T> & SelectProps
) => {
  const state = useSelectState(props);
  const ref = useRef(null);

  const { triggerProps, valueProps, menuProps } = useSelect(props, state, ref);
  const { focusProps, isFocusVisible: isFocused } = useFocusRing();

  const { buttonProps } = useButton(
    mergeProps(triggerProps, focusProps, { disabled: props.isDisabled }),
    ref
  );

  return (
    <SelectContainer>
      <HiddenSelect state={state} triggerRef={ref} label={props.label} />
      <SelectButton {...buttonProps} ref={ref}>
        <SelectCaption>
          {state.selectedItem
            ? state.selectedItem.rendered
            : props.placeholder ?? "Выберите опцию"}
        </SelectCaption>
      </SelectButton>
      {state.isOpen && !props.disabled && (
        <ListBoxPopover {...menuProps} state={state} targetRef={ref} />
      )}
    </SelectContainer>
  );
};

export { Select, Item as Option };
