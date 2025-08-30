# 1.0.0 Release Checklist

## Things to do before releasing version 1.0.0 of a package

- Does the README.md describe the package?
- Are all exports documented?
- Read through the docs.
- Do all exports have typetests?
- Are all exported types used in function return types marked
  non-user-constructible (if appropriate)?
- Are all dependencies of this package 1.0.0 already?

Note: this checklist is not complete!

## Things to do after releasing 1.0.0

- Update all dependents of the package to request `^1.0.0`.

Note: this checklist is not complete!
