import { useMemo } from "react";

interface Product {
  nombre: string;
  cantidad: number;
  precioUnitario: string;
  descuento: string;
  precioNeto: string;
  totalLinea: string;
}

interface ReportData {
  fecha: string;
  clienteNombre: string;
  clienteRUT: string;
  clienteEmail: string;
  productos: Product[];
  subtotal: string;
  descuentoTotal: string;
  iva: string;
  totalFinal: string;
}

export function useGenerateReport(template: string, data: ReportData) {
  const html = useMemo(() => {
    let result = template;

    // Reemplazar campos simples
    Object.keys(data).forEach((key) => {
      if (key !== "productos") {
        const re = new RegExp(`{{${key}}}`, "g");
        result = result.replace(re, (data as any)[key]);
      }
    });

    if (data.productos && data.productos.length > 0) {
      const productosHTML: string[] = data.productos.map((prod) => {
        let row =
          result.match(/{{#productos}}([\s\S]*?){{\/productos}}/)?.[1] || "";
        Object.keys(prod).forEach((k) => {
          const re = new RegExp(`{{${k}}}`, "g");
          row = row.replace(re, (prod as any)[k]);
        });
        return row;
      });
      result = result.replace(
        /{{#productos}}([\s\S]*?){{\/productos}}/,
        productosHTML.join("")
      );
    } else {
      result = result.replace(/{{#productos}}([\s\S]*?){{\/productos}}/, "");
    }

    return result;
  }, [template, data]);

  return html;
}
