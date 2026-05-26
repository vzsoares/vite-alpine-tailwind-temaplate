// Opt into @kitajs/html's Alpine.js attribute types (x-data, x-text, ...).
// This augments JSX.HtmlTag globally for every .tsx file.
/// <reference types="@kitajs/html/alpine" />

// Let Alpine's namespaced directives be used as typed JSX props instead of
// @kitajs/html's `attrs={{ ... }}` escape hatch, e.g. `x-on:click="inc()"` or
// `x-bind:class="cls"`. (The `@click` / `:class` shorthands stay unsupported —
// `@` and a leading `:` are not valid JSX attribute names.)
declare namespace JSX {
    interface HtmlTag {
        [onDirective: `x-on:${string}`]: string | undefined;
    }
    interface HtmlTag {
        [bindDirective: `x-bind:${string}`]: string | undefined;
    }
}
