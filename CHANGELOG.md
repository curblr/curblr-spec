CHANGELOG.md
---

## 1.1.0
- Remove priority levels. A few users ran into areas where the current groupings made mapping cumbersome and each developed their own workaround. We examined the priority aspect carefully and determined it would be more efficient and flexible to add a `priorityCategory` to the rule (e.g. `game day`, `paid parking`) and require an ordered list of these priorities in the metadata as a new `priorityHierarchy`, as opposed to hardcoding priority levels into the spec. [Related issue](https://github.com/sharedstreets/curblr/issues/15)
- Remove optional `reason` property; this will generally be the same as the `priorityCategory` and is also captured elsewhere in the spec properties; removing to prevent additional duplication of information.
- Revise payment properties to fit more payment models and use cases. [Related issue](https://github.com/sharedstreets/curblr/issues/20)
- Create new property in the manifest for a CurbLR version number. [Related issue](https://github.com/sharedstreets/curblr/issues/17)
- Create new `status` property as a location property. [Related issue](https://github.com/sharedstreets/curblr/issues/16)
- `Marker` renamed to `assetType`; list of well-known values expanded. New property, `assetSubtype` added to capture aspects like the color of curb paint, etc.
- LA conversion example removed from documentation. It will remain in previous branches but is now out of date with CurbLR and cumbersome to update. Portland CurbLR feed remains up to date.

## 1.0.0
Release created in fall 2019
