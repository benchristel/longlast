# 1.0.0 Release Checklist

## Things to do before releasing version 1.0.0 of a package

- Ensure the README.md describes the package.
- Ensure all exports are documented.
- Read through the docs.
- Ensure all exports have typetests.
- Ensure all exported types used in function return types are marked
  non-user-constructible (if appropriate).
- Move the tests for any behavior we might not want to support out of `api/`.
- Ensure the API specs exemplify how the package might be used in both
  TypeScript and JavaScript code.
- Remove Hyrum's Law footguns. If the package makes certain assumptions about
  its use, those should be encoded in runtime assertions as well as types.
- Are all dependencies of this package 1.0.0 already?

Note: this checklist is not complete!

## Things to do after releasing 1.0.0

- Update all dependents of the package to request `^1.0.0`.

Note: this checklist is not complete!
