import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/blogs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreateBlog() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setForm({ title: "", description: "", content: "" });
    },
  });

  const submit = () => {
    mutation.mutate({
      ...form,
      category: ["GENERAL"],
      coverImage:
        "https://s44783.pcdn.co/in/wp-content/uploads/sites/3/2022/10/Technical-Skills_How-to-Them-Master-in-2022.jpg.optimal.jpg",
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-2">
      <Input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
      <Textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />
      <Button onClick={submit} disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </Button>
    </div>
  );
}
