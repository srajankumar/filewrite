import { Button } from "@/components/ui/button";

const MdxHeader = ({
  feedElement,
}: {
  feedElement: (syntax: string) => void;
}) => {
  const btns = [
    // Text formatting
    { name: "B", syntax: "**Bold**" },
    { name: "I", syntax: "*Italic*" },
    { name: "S", syntax: "~~Strikethrough~~" },
    { name: "Code", syntax: "`Inline code`" },
    { name: "Quote", syntax: "> Blockquote" },

    // Headings
    { name: "H1", syntax: "# Heading 1" },
    { name: "H2", syntax: "## Heading 2" },
    { name: "H3", syntax: "### Heading 3" },

    // Lists
    { name: "UL", syntax: "- List item" },
    { name: "OL", syntax: "1. List item" },
    { name: "Task", syntax: "- [ ] Task item" },

    // Links & Media
    { name: "Link", syntax: "[Link text](https://example.com)" },
    { name: "Image", syntax: "![Alt text](https://image.url)" },
    { name: "Video", syntax: "<video src='https://video.url' controls />" },

    // Code Blocks
    { name: "Code Block", syntax: "```js\nconsole.log('Hello MDX');\n```" },

    // Tables
    {
      name: "Table",
      syntax: `| Header 1 | Header 2 |\n| -------- | -------- |\n| Row 1 Col 1 | Row 1 Col 2 |`,
    },

    // Horizontal rule
    { name: "HR", syntax: "---" },

    // Details / collapsible
    {
      name: "Details",
      syntax: `<details>\n<summary>Click to expand</summary>\nHidden content here\n</details>`,
    },

    // Alerts (MDX-specific, like remark-gfm or rehype-pretty)
    { name: "Info", syntax: `> [!INFO]\n> Useful information note.` },
    { name: "Warning", syntax: `> [!WARNING]\n> Important warning note.` },
  ];

  return (
    <header className="flex flex-wrap gap-3">
      {btns.map((btn) => (
        <Button
          key={btn.syntax}
          variant={"outline"}
          size={"sm"}
          onClick={() => feedElement(btn.syntax)}
        >
          {btn.name}
        </Button>
      ))}
    </header>
  );
};

export default MdxHeader;
