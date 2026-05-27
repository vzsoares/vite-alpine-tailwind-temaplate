/**
 * Build-time Markdown → HTML rendering with Shiki syntax highlighting.
 *
 * Uses Shiki's *synchronous* core so rendering stays sync (no async page
 * components). Only imported by build-time page components, so neither `marked`
 * nor `shiki` ships to the browser.
 */
import { Marked } from "marked";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/bash.mjs";
import css from "shiki/langs/css.mjs";
import html from "shiki/langs/html.mjs";
import json from "shiki/langs/json.mjs";
import tsx from "shiki/langs/tsx.mjs";
import ts from "shiki/langs/typescript.mjs";
import githubDark from "shiki/themes/github-dark-default.mjs";

const THEME = "github-dark-default";

const highlighter = createHighlighterCoreSync({
    engine: createJavaScriptRegexEngine(),
    themes: [githubDark],
    langs: [ts, tsx, bash, css, html, json],
});

const loadedLangs = new Set(highlighter.getLoadedLanguages());

const md = new Marked({
    renderer: {
        code({ text, lang }) {
            const language = lang && loadedLangs.has(lang) ? lang : "text";
            return highlighter.codeToHtml(text, {
                lang: language,
                theme: THEME,
            });
        },
    },
});

/** Render trusted Markdown (our own content) to an HTML string. */
export function renderMarkdown(markdown: string): string {
    const result = md.parse(markdown);
    if (typeof result !== "string") {
        throw new Error("expected a synchronous Markdown render");
    }
    return result;
}
