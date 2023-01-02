import React, { useCallback, useEffect, useRef, useState } from "react";
import "./bubble-input.css";
interface BubbleInputProps {
  value: string;
  onChange: (s: string) => void;
  onSubmit: (height: number) => void;
}
const BubbleInput = (props: BubbleInputProps) => {
  const refEditable = useRef<HTMLDivElement>();
  const refContainer = useRef<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  //回车键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { current: elContainer } = refContainer;
    const { current: elEditable } = refEditable;
    const { isComposing } = e.nativeEvent;
    if (e.key === "Enter" && !isComposing) {
      const height = elContainer.clientHeight;
      props.onSubmit(height);
      e.preventDefault();
      setSubmitted(true);
      requestAnimationFrame(() => {
        elEditable.focus();
        elEditable.innerText = "";
        setSubmitted(false);
      });
    }
  };
  //输入框在一开始就要获取焦点
  const handleBlur = useCallback(() => {
    const { current: elDiv } = refEditable;
    if (elDiv) {
      elDiv.focus();
    }
  }, [refEditable]);

  useEffect(handleBlur, [handleBlur]);
  return (
    <div
      ref={refContainer}
      className={`bubble input ${props.value.length === 0 ? "empty" : ""} ${
        submitted ? "submitted" : ""
      }`}
    >
      <div
        ref={refEditable}
        className="bubble-content"
        contentEditable
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={(e) => props.onChange((e.target as HTMLElement).innerText)}
      />
    </div>
  );
};
export default BubbleInput;
