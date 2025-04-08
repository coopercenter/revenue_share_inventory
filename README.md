# Revenue Share Inventory

In 2020, Virginia passed legislation to offers localities two options to generate revenues from utility-scale solar and energy storage systems. As described in the Code of Virginia section 58.1-3660, the default option is to levy a Machinery and Tools (M&T)/Real Estate tax on capital investments in solar generation facilities. Alternatively, a locality may adopt an ordinance to replace the M&T/Real Estate tax with a Revenue Share arrangement. Under the Revenue Share model, localities receive income from solar facilities at a flat rate in dollars of up to $1,400 per megawatt of generation capacity per year.

__Revenue Share Inventory__: [https://coopercenter.github.io/revenue_share_inventory/](https://coopercenter.github.io/revenue_share_inventory/)

## Structure
### Github
Any changes made to the main branch are automatically pushed into the live server that is hosted on GitHub Pages. Make sure changes are working properly before pushing to the master branch. Commit changes to branches other than master branch then merge when appropriate. Make sure you commit changes frequently to save changes.

### Files 
1. __index.html__ - The main HTML file that structures and contains the web application’s content.
2. __css__ - Stylesheet used by index.html to design HTML elements including font size, position, and color. 
3. __.gitignore__ - File that tells Git to intentional ignore files that in this case contain sensitive information such as login credentials which should not be pushed to the repository.
4. __main.js__ - A JavaScript file used by index.html to add interactivity, such as toggles, checkboxes, and dynamic coloring of elements.

## Development
1. Clone the Revenue Share Inventory repository and create a new branch for development

    __Working with GitHub in VS Code Tutorial__: [https://code.visualstudio.com/docs/sourcecontrol/github](https://code.visualstudio.com/docs/sourcecontrol/github)

2. If you have not downloaded the _Live Server_ extension, download the extension to run a local development server. To use the extension, left-click on index.html and use _Open with Live Server_. 
3. Make the additional needed changes to Revenue Share Inventory while checking the server perodically to ensure the changes made are successful.
4. When all needed changes have been made and the local server runs successfully, push all your changes to your respective dev branch. If using Git, in the command line, run `git add file_name` to add the file(s) that have been changed. Next, in the command line, run `git commit 'commit_name'` to name your commit and run `push origin -u 'branch_name` to push your changes to the dev branch.
5. Merge your branch with the master branch to update the Revenue Share Inventory. 
