import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Bold,
  Braces,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link,
  List,
  ListChecks,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
  Table,
  Video,
} from "lucide-react";

const MdxHeader = ({
  feedElement,
}: {
  feedElement: (syntax: string) => void;
}) => {
  const btns = [
    // Text formatting
    { name: <Bold />, syntax: "**Bold**" },
    { name: <Italic />, syntax: "*Italic*" },
    { name: <Strikethrough />, syntax: "~~Strikethrough~~" },
    { name: <Code2 />, syntax: "`Inline code`" },
    { name: <Quote />, syntax: "> Blockquote" },

    // Headings
    { name: <Heading1 />, syntax: "# Heading 1" },
    { name: <Heading2 />, syntax: "## Heading 2" },
    { name: <Heading3 />, syntax: "### Heading 3" },

    // Lists
    { name: <List />, syntax: "- List item" },
    { name: <ListOrdered />, syntax: "1. List item" },
    { name: <ListChecks />, syntax: "- [ ] Task item" },

    // Links & Media
    { name: <Link />, syntax: "[Link text](https://example.com)" },
    { name: <ImageIcon />, syntax: "![Alt text](https://image.url)" },
    { name: <Video />, syntax: "<video src='https://video.url' controls />" },

    // Code Blocks
    { name: <Braces />, syntax: "```js\nconsole.log('Hello MDX');\n```" },

    // Tables
    {
      name: <Table />,
      syntax: `| Header 1 | Header 2 |\n| -------- | -------- |\n| Row 1 Col 1 | Row 1 Col 2 |`,
    },

    // Horizontal rule
    { name: <Minus />, syntax: "---" },
  ];

  return (
    <ScrollArea className="overflow-hidden">
      <header className="flex gap-3 pb-3">
        {btns.map((btn) => (
          <Button
            key={btn.syntax}
            variant={"outline"}
            size={"icon"}
            onClick={() => feedElement(btn.syntax)}
          >
            {btn.name}
          </Button>
        ))}
      </header>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default MdxHeader;
