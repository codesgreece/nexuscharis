"use client";

import { cn } from "@/lib/utils";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import { useEffect, useId, useRef } from "react";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

function ToolbarButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-purple-deep transition hover:border-border-soft hover:bg-lavender-light"
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  label,
  defaultValue = "",
  required,
  hint,
  className,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = defaultValue || "";
    }
    if (inputRef.current) {
      inputRef.current.value = defaultValue || "";
    }
  }, [defaultValue]);

  function sync() {
    if (!editorRef.current || !inputRef.current) return;
    inputRef.current.value = editorRef.current.innerHTML;
  }

  function exec(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    sync();
  }

  function addLink() {
    const url = window.prompt("URL συνδέσμου");
    if (!url) return;
    exec("createLink", url);
  }

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-end justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-purple-deep">
          {label}
          {required ? <span className="text-red-600"> *</span> : null}
        </label>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border-soft bg-white">
        <div className="flex flex-wrap gap-1 border-b border-border-soft bg-lavender-light/50 px-2 py-1.5">
          <ToolbarButton label="Bold" onClick={() => exec("bold")}>
            <Bold className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Italic" onClick={() => exec("italic")}>
            <Italic className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Underline" onClick={() => exec("underline")}>
            <Underline className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Heading" onClick={() => exec("formatBlock", "h2")}>
            <Heading2 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Subheading" onClick={() => exec("formatBlock", "h3")}>
            <Heading3 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Bullet list" onClick={() => exec("insertUnorderedList")}>
            <List className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Numbered list" onClick={() => exec("insertOrderedList")}>
            <ListOrdered className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton label="Link" onClick={addLink}>
            <LinkIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
        </div>

        <div
          id={id}
          ref={editorRef}
          contentEditable
          role="textbox"
          aria-multiline
          aria-required={required}
          suppressContentEditableWarning
          onInput={sync}
          onBlur={sync}
          className={cn(
            "min-h-[140px] px-3.5 py-3 text-sm leading-relaxed text-[#171717] outline-none",
            "[&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-bold",
            "[&_h3]:mb-1.5 [&_h3]:mt-2 [&_h3]:text-sm [&_h3]:font-bold",
            "[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5",
            "[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
            "[&_a]:text-purple-primary [&_a]:underline",
            "[&_p]:mb-2",
          )}
        />
      </div>

      <input ref={inputRef} type="hidden" name={name} defaultValue={defaultValue} />
    </div>
  );
}
