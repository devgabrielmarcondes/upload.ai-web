import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { api } from "@/lib/axios";

type TPrompt = {
  id: string;
  title: string;
  template: string;
};

type TPromptSelectedProps = {
  onPromptSelected: (template: string) => void;
};

export function PromptSelect(props: TPromptSelectedProps) {
  const [prompts, setPrompts] = useState<TPrompt[] | null>(null);

  // get prompts
  useEffect(() => {
    api.get("/prompts").then((res) => setPrompts(res.data));
  }, []);

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    }

    props.onPromptSelected(selectedPrompt.template);
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => {
          return <SelectItem value={prompt.id}>{prompt.title}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
}
