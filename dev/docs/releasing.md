# Releasing

Releasing is a semi-manual process for now. We expect releases to be frequent
and simple (involving only one package at a time).

To do a release, first write an entry in the package's `CHANGELOG.md` file (but
don't commit it). The changelog format is:

```markdown
# @longlast/my-package

## 1.2.3 (2007-08-09)

Release notes go here.

## 1.2.2 (2007-08-08)

Release notes for version 1.2.2...
```

The log is reverse-chronological. Each release has a level-2 heading with
the version number and the date in YYYY-MM-DD format.

Then run:

```sh
make release
```

This does the following:

- runs all checks
- bumps the version in `package.json`
- commits the changes to `package.json` and `CHANGELOG.md`
- tags the commit
- builds a tarball of the package
- outputs the commands to actually publish the release on GitHub and NPM. You
  must run these commands manually to finish the release.
