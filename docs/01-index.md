---
title: Nijmegen Component Library
status: ready # draft, ready
---

This library has been created to facilitate Gemeente Nijmegen in a uniform and consistent visual representation throughout all her digital exposures.

The goals of this component library are:
* A deeply integrated, living part of a website or application's codebase.
* A code and documentation deliverable for implementation by an in-house team.
* A code and documentation deliverable for implementation by a third party development agency.
* A reference document for different teams, to ensure consistency between sites and/or platforms.

Built upon [MDB framework]({{ mdbootstrapPath '/' }}) with custom styling specific for Nijmegen.


## Component listing

On the left-side you see all the components which are marked to be used by Nijmegen based on the 
components from the [MDB framework]({{ mdbootstrapPath '/' }}) and styled specific for Nijmegen
to create a consistent look-and-feel.

When a component has multiple visual representations, it will act as a folder marked with an arrow
in front of the components name. Unfolding such a component will list the various versions which can be viewed separately.


## Component view

By clicking on a component from the listing on the left you will see the interface change to underneath screenshot.

<figure style="border: 1px solid #535363;">![Viewing a component which shows a preview pane and tabs to copy the HTML needed to use this component, see any notes described by the component and the component library specific information]({{ assetPath '/img/docs-component-view.png' }})</figure>

Here you will see the components name, it's status on the right of the name, the preview pane under the name and a pane with several tabs (HTML, Notes and component library info)
with more in-depth information regarding the component.

By clicking the name of the component and/or <svg fill="#535363" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></svg> icon
you can view the component as it's rendered in the preview pane only now in a separate URL without the component library layout surrounding it.

The pane with the several tabs provide information mainly aimed at implementors.
<table>
<caption>Available component information</caption>
<tbody>
<tr>
  <th>Tab</th>
  <th>Description</th>
</tr>
<tr>
  <td>HTML</td>
  <td>A copy-paste ready HTML markup of the component</td>
</tr>
<tr>
  <td>Notes</td>
  <td>
    When applicable, specific information for the component<br><br>
    *documenting for instance<br>
    <ul>
      <li>additions to the component (compared to the original from MDB framework) for accessibility reasons like [listing]({{ componentPath '@listing' }})</li>
      <li>implementation of an interactive JavaScript component like [carousel]({{ componentPath '@carousel' }}) or [select]({{ componentPath '@select' }})</li>
    </ul>
    *
  </td>
</tr>
<tr>
  <td>Component library info</td>
  <td>Some in-depth information regarding the component mainly aimed at developers of the component library</td>
</tr>
</tbody>
</table>


## Component statuses

Components and their variants have been given statuses reflecting their state of completion. Next to the components name in the listing on the left,
you can see (based on the color of the dot) what the status of the component is.
When viewing a component, the status can be seen above the preview.

<table>
<caption>Available component statuses</caption>
<tbody>
<tr>
  <th>Label</th>
  <th>Description</th>
</tr>
<tr>
  <td>
    <div class="Status Status--tag">
      <label class="Status-label" style="background-color: #f33; border-color: #f33;">Prototype</label>
    </div>
  </td>
  <td>Do not implement.</td>
</tr>
<tr>
  <td>
    <div class="Status Status--tag">
      <label class="Status-label" style="background-color: #ff9233; border-color: #ff9233;">WIP</label>
    </div>
  </td>
  <td>Work in progress. Implement with caution.</td>
</tr>
<tr>
  <td>
    <div class="Status Status--tag">
      <label class="Status-label" style="background-color: #29cc29; border-color: #29cc29;">Ready</label>
    </div>
  </td>
  <td>Ready to implement.</td>
</tr>
</tbody>
</table>
