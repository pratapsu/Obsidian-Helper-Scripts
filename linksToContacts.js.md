function createListOfReferences() {
	let f = dv.current().file.frontmatter.name[0].first
	let l = dv.current().file.frontmatter.name[1].last
	if (f != null && l != null) {
		let p = dv.pages("#" + f + "_" + l).sort(t => t.file.mtime, 'desc')

		if (p.length == 0) {
			dv.header(1, f + " " + l + " is not referred in any notes.")
		} else {
			dv.header(1, "These notes refer to " + f + " " + l)
			dv.table([], 
				p.map(b => [b.file.link, dv.span(dv.el("i", b.file.mtime))]))
		}
	}
}

createListOfReferences()
