// {{{tag}}}

{{#each importArr}}
{{{this}}}
{{/each}}


{{#each apiArr}}
// {{{summary}}}
export const {{fnName}} = ({{parameters}}) => {{method}}(`${baseUrl}{{{url}}}, data)

{{/each}}
