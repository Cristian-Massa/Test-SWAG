import { useState } from "react";

interface UsePrintProps {
  template: string | null;
  paramsToChange: { [x: string]: string };
}
const useConvertParams = () => {
  const convert = (
    template: string | null,
    paramsToChange: Record<string, string>
  ) => {
    if (!template) {
      throw new Error("Template is null");
    }

    let modifiedTemplate = template;

    Object.entries(paramsToChange).forEach(([key, value]) => {
      modifiedTemplate = modifiedTemplate.replaceAll(key, value);
    });

    return modifiedTemplate;
  };

  return convert;
};

export const usePrint = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sanitizedHTML = useConvertParams();
  const handleClick = ({ template, paramsToChange }: UsePrintProps) => {
    setIsOpen(true);
    const windowPrint = window.open(
      "",
      "",
      "status=1,width=600,height=800,menubar=no,toolbar=no,focused=yes"
    );
    const htmlContent = sanitizedHTML(template, paramsToChange);

    if (windowPrint) {
      windowPrint.document.documentElement.innerHTML = htmlContent;
      windowPrint.print();
      windowPrint.close();
    }
    setIsOpen(false);
  };

  return { handleClick, isOpen };
};
