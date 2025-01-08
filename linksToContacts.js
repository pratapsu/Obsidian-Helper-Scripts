//
//
// Place this file in a directory, say "Scripts" at the root of your vault. 
//
// Then include the following in each of your notes that represent a contact
// or directly in the template that creates a new contact: 
//
//  ```dataviewjs
//    await dv.view("Scripts/linksToContacts");
//  ```
//
// This will scan all the files in your vault, looking for any that have a tag 
// to your contact "first_last", and then create a table of all such references 
// in your contact note directly. 
//
async function createListOfReferences() {
	let f = dv.current().file.frontmatter.fullname[0].first
	let l = dv.current().file.frontmatter.fullname[1].last
	if (f != null && l != null) {
		const inlinks = dv.current().file.inlinks;
		if (inlinks.length > 0) {			
			dv.header(4, "References")
            dv.table([], inlinks.map(b => [b, dv.span(dv.el("i", dv.page(b).file.mtime))]))
		} else {
		    dv.paragraph("No inlinks found.");
		}
	}
}

createListOfReferences()
