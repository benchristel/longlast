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

## Aborting a release

To abort/undo a release (which can only be done before you've run the manual
commands `make release` outputs), run:

```sh
# drop the release commit from the history
git reset --hard @longlast/my-package@1.2.3~
# delete the release tag
git tag -d @longlast/my-package@1.2.3
```

## Releasing concurrently with other changes

It's bound to happen at some point: you cut a release, try to push to `main`,
and the push fails because there are new commits you don't have locally.

The fix is to `git reset --hard` your local `main` to `origin/main`
(effectively dropping the release commit from the history) and then merge in
the release commit (which will still be accessible via the tag):

```bash
git fetch origin main
git checkout main
git reset --hard origin/main
git merge @longlast/my-package@1.2.3
git push origin main
```

The result should look like this in the git log:

```
* Merge @longlast/my-package@1.2.3 into main (HEAD -> main, origin/main)
|\
* | Commit from main
* | Another commit from main
| * Release @longlast/my-package@1.2.3 (tag: @longlast/my-package@1.2.3)
|/
* ...
```
