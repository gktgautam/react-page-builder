import { z } from "zod";
export declare const StyleZ: z.ZodObject<{
    width: z.ZodOptional<z.ZodString>;
    maxWidth: z.ZodOptional<z.ZodString>;
    margin: z.ZodOptional<z.ZodString>;
    padding: z.ZodOptional<z.ZodString>;
    display: z.ZodOptional<z.ZodEnum<["block", "flex", "grid"]>>;
    flex: z.ZodOptional<z.ZodString>;
    justifyContent: z.ZodOptional<z.ZodString>;
    alignItems: z.ZodOptional<z.ZodString>;
    gap: z.ZodOptional<z.ZodString>;
    background: z.ZodOptional<z.ZodString>;
    border: z.ZodOptional<z.ZodString>;
    borderRadius: z.ZodOptional<z.ZodString>;
    boxShadow: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodString>;
    fontSize: z.ZodOptional<z.ZodString>;
    fontWeight: z.ZodOptional<z.ZodString>;
    lineHeight: z.ZodOptional<z.ZodString>;
    textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
    _md: z.ZodOptional<z.ZodAny>;
    _lg: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    width?: string | undefined;
    maxWidth?: string | undefined;
    margin?: string | undefined;
    padding?: string | undefined;
    flex?: string | undefined;
    display?: "block" | "flex" | "grid" | undefined;
    justifyContent?: string | undefined;
    alignItems?: string | undefined;
    gap?: string | undefined;
    background?: string | undefined;
    border?: string | undefined;
    borderRadius?: string | undefined;
    boxShadow?: string | undefined;
    color?: string | undefined;
    fontSize?: string | undefined;
    fontWeight?: string | undefined;
    lineHeight?: string | undefined;
    textAlign?: "left" | "center" | "right" | "justify" | undefined;
    _md?: any;
    _lg?: any;
}, {
    width?: string | undefined;
    maxWidth?: string | undefined;
    margin?: string | undefined;
    padding?: string | undefined;
    flex?: string | undefined;
    display?: "block" | "flex" | "grid" | undefined;
    justifyContent?: string | undefined;
    alignItems?: string | undefined;
    gap?: string | undefined;
    background?: string | undefined;
    border?: string | undefined;
    borderRadius?: string | undefined;
    boxShadow?: string | undefined;
    color?: string | undefined;
    fontSize?: string | undefined;
    fontWeight?: string | undefined;
    lineHeight?: string | undefined;
    textAlign?: "left" | "center" | "right" | "justify" | undefined;
    _md?: any;
    _lg?: any;
}>;
export type Style = z.infer<typeof StyleZ>;
export declare const NodeZ: z.ZodType<{
    id: string;
    type: string;
    props: Record<string, any>;
    style: Style;
    children: Node[];
}>;
export type Node = z.infer<typeof NodeZ>;
export declare const PageDocumentZ: z.ZodObject<{
    version: z.ZodLiteral<1>;
    title: z.ZodDefault<z.ZodString>;
    tree: z.ZodType<{
        id: string;
        type: string;
        props: Record<string, any>;
        style: Style;
        children: Node[];
    }, z.ZodTypeDef, {
        id: string;
        type: string;
        props: Record<string, any>;
        style: Style;
        children: Node[];
    }>;
}, "strip", z.ZodTypeAny, {
    version: 1;
    title: string;
    tree: {
        id: string;
        type: string;
        props: Record<string, any>;
        style: Style;
        children: Node[];
    };
}, {
    version: 1;
    tree: {
        id: string;
        type: string;
        props: Record<string, any>;
        style: Style;
        children: Node[];
    };
    title?: string | undefined;
}>;
export type PageDocument = z.infer<typeof PageDocumentZ>;
