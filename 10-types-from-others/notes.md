# Section 10 — Type Composition Toolkit

This section is about **building new types from existing ones**. You already know how to _declare_ types; here you learn how to **compose, constrain, and transform** them so your types scale with your codebase.

Think of this as your _type-level toolbox_.

---

## 1. Generics: types with parameters

Generics let you write types and functions that work over many shapes while staying type-safe.

```ts
function wrap<T>(value: T) {
  return { value };
}
```

- `T` is a placeholder for “whatever type is passed in”
- TypeScript infers `T` from usage

```ts
const wrappedNumber = wrap(42);
// { value: number }

const wrappedString = wrap("hello");
// { value: string }
```

Generics avoid duplication and keep types precise.

---

## 2. Constraining generics with `extends`

Sometimes “anything” is too loose. Constraints let you require a minimum shape.

```ts
function getId<T extends { id: number }>(item: T) {
  return item.id;
}
```

This means:

- `T` can be _any type_
- **as long as** it has an `id: number`

```ts
getId({ id: 1, name: "Alice" }); // ✅
getId({ name: "Bob" }); // ❌
```

Use constraints to:

- protect access to properties
- document assumptions
- improve error messages

---

## 3. Utility types: reuse instead of rewrite

TypeScript ships with utility types that _derive new types from old ones_.

Common examples:

```ts
type UserPreview = Pick<User, "id" | "name">;
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
```

These are:

- predictable
- well-understood
- preferable to manual redefinitions

If you’re copying fields by hand, check if a utility type exists first.

---

## 4. Conditional types: types with logic

Conditional types add **branching logic** at the type level.

```ts
type ApiResult<T> = T extends string ? { value: string } : { value: number };
```

Usage:

```ts
type A = ApiResult<string>; // { value: string }
type B = ApiResult<number>; // { value: number }
```

This mirrors runtime `if` logic — but for types.

They’re powerful, but should stay small and focused.

---

## 4b. Filtering unions: `Extract` and friends

Web apps are full of unions: UI notifications, API actions, route definitions, form fields. Each member has a `type` tag, and you often want _just one member_ or _just its props_.

```ts
type Toast = { type: "toast"; id: string; message: string; durationMs: number };
type Modal = { type: "modal"; id: string; title: string; body: string };
type Notification = Toast | Modal;
```

Get the union of tags with an indexed access type:

```ts
type NotificationName = Notification["type"];
// "toast" | "modal"
```

Pick one member with `Extract`:

```ts
type JustToast = Extract<Notification, { type: "toast" }>;
// Toast
```

`Extract` is a conditional type. It runs once for **each member** of the union and keeps those that match (this is called _distribution_):

```ts
type MyExtract<U, Filter> = U extends Filter ? U : never;
```

Drop the keys the caller shouldn't supply with `Omit` (it accepts a union of keys):

```ts
type ToastProps = Omit<Toast, "type" | "id">;
// { message: string; durationMs: number }
```

Compose them into a reusable helper:

```ts
type PropsFor<T extends NotificationName> = Omit<
  Extract<Notification, { type: T }>,
  "type" | "id"
>;
```

### Linking two parameters with one generic

```ts
function notify<T extends NotificationName>(type: T, props: PropsFor<T>) {
  const notification = {
    type,
    id: crypto.randomUUID(),
    ...props,
  } as Extract<Notification, { type: T }>;
  queue.push(notification);
  return notification;
}

notify("toast", { message: "Saved!", durationMs: 3000 }); // ✅ returns Toast
notify("toast", { title: "Saved!" }); // ❌ a toast has no title
```

- `T` is inferred as the literal `"toast"` because the constraint is a union of string literals
- `type` decides what `props` must look like
- the return type is the specific member, not the whole union

### Why is there an `as`?

The object we build has type `{ type: T; id: string } & PropsFor<T>`. For a _generic_ `T`, TypeScript can't prove that matches the right member of the union, so we assert it.

That assertion is the one unchecked spot. The function signature keeps every _caller_ safe, which is why it is an acceptable trade-off. Keep these assertions small and in one place.

See `src/07-composing.ts` to build this up step by step.

---

## 5. Mapped types with `in`

Mapped types let you transform _every property_ of a type.

```ts
type Flags<T> = {
  [K in keyof T]: boolean;
};
```

```ts
type FeatureFlags = Flags<Features>;
// every property becomes boolean
```

Key ideas:

- `keyof T` gives you the keys
- `K in ...` iterates over them
- the output shape mirrors the input shape

This is the foundation of many utility types.

---

## How these tools fit together

Most real-world type composition combines techniques:

- generics + constraints
- mapped types + `keyof`
- conditional types + utilities

Example mental model:

> “Start with a base type → derive safer or more specific views of it.”

---

## Common pitfalls & quick fixes

- **Overcomplicating conditional types**
  → Prefer clarity over cleverness.

- **Missing constraints on generics**
  → Add `extends` when accessing properties.

- **Rewriting existing utility types**
  → Check the built-ins first.

- **Types that are hard to read**
  → Break them into named pieces.

---

## What to remember

- Generics parameterise types
- Constraints protect assumptions
- Utility types save effort and reduce drift
- Conditional types add logic
- Mapped types transform shapes consistently

---

### Final checklist

- [ ] Could this be a generic instead of duplicated types?
- [ ] Do I need a constraint to make this safe?
- [ ] Is there a built-in utility type I can reuse?
- [ ] Would a mapped type remove boilerplate?
- [ ] Is this type readable six months from now?
