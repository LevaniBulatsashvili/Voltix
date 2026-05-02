# Voltix — agent context

## What this is

Full-stack eCommerce app for electronics: catalog, cart, orders, wishlist, user profile, and admin panel. Supabase is the real backend (not mocked).

## Stack

| Area                          | Choice                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| UI                            | React 19 (Vite), Tailwind CSS v4                                       |
| Icons                         | Lucide React                                                           |
| Server state / caching        | TanStack React Query v5                                                |
| Client state                  | Redux Toolkit (cart, auth, settings, theme)                            |
| Backend / auth / DB / storage | Supabase (`@supabase/supabase-js`)                                     |
| Forms                         | React Hook Form + Zod (`@hookform/resolvers`)                          |
| Notifications                 | React Toastify + Redux notification slice                              |
| Routing                       | React Router v7                                                        |
| Motion                        | GSAP — import from `gsap`, used only in electronics banner             |
| i18n                          | react-i18next — EN and KA (Georgian)                                   |
| Image optimization            | browser-image-compression — converts to WebP, max 1200px, quality 0.82 |

## Key patterns

### Data fetching

- `createSupabaseService` in `src/lib/supabase/createSupabaseService.ts` — generic CRUD factory (fetchMany, infiniteFetch, fetch, create, createMany, update, deleteMany, delete)
- `createEntityHooks` in `src/lib/react-query/createEntityHooks.ts` — wraps a service into typed React Query hooks
- `createQueryHook`, `createMutationHook`, `createInfiniteQueryHook` in `src/lib/react-query/` — lower-level primitives
- Query keys and table names defined in `src/lib/react-query/configs.ts`

### Forms

- `FormInput` at `src/components/form/Input/FormInput.tsx` — generic, label optional, translates via i18n
- `FormSelect` at `src/components/form/Input/FormSelect.tsx` — uses `useController`, supports `isLoading` skeleton state
- All form schemas use Zod, co-located with their feature under `schemas/`

### Image upload

- `useImageSelector` at `src/features/shared/imageSelector/hooks/useImageSelector.ts`
- Converts to WebP via `browser-image-compression` before uploading to Supabase storage
- `uploadRef` pattern — parent form triggers upload on submit via a ref
- First uploaded image becomes the product `thumbnail`

### State

- Cart, wishlist, auth, theme, settings persisted via custom Redux middleware
- Notifications dispatched to Redux slice, consumed by `ToastListener`
- `useCopyToClipboard` at `src/hooks/useCopyToClipboard.ts` — shared clipboard hook used across order IDs and promo codes
- `usePromoCode` at `src/features/user/cart/hooks/usePromoCode.ts` — validates and applies promo codes against Supabase, computes discounted total

### Modals

- `Modal` at `src/components/ui/modal/Modal.tsx` — base modal with `useEscKey` and `useClickOutside`, `disableClickOutside` prop
- `ItemModal` — wraps `Modal` for admin CRUD forms (add/edit), i18n title, submit/cancel actions
- `ConfirmModal` — wraps `Modal` for destructive confirmations, `danger` variant for red confirm button
- `ProductReviewModal` — uses `Modal` for submitting star rating + comment, resets state on close

## Engineering principles

- **SOLID** boundaries: small modules, clear responsibilities
- **Feature-based** structure under `src/features/` — co-locate hooks, components, services, schemas per domain
- Shared/reusable code in `src/components/`, `src/lib/`, `src/hooks/`
- **Readable over clever**: obvious names, shallow nesting, consistent patterns
- Forms never use `<form>` submit — use React Hook Form's `handleSubmit`
- Mutations use `mutateAsync` when the result is needed (e.g. getting `newProduct.id` after create)

## Environment

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Commands

```bash
npm run dev      # local dev (Vite)
npm run build    # typecheck + production build
npm run lint     # ESLint
npm run preview  # preview production build
```

## Supabase tables

| Table              | Key fields                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `products`         | `id`, `name`, `thumbnail`, `brand_id`, `main_category_id`, `category_id`, `price`, `price_final`, `stock`, `rating_avg`, `rating_count`, `total_sold` |
| `product_images`   | `id`, `product_id`, `image_url`                                                                                                                       |
| `product_comments` | `id`, `product_id`, `profile_id`, `rating`, `comment`, `verified`, `created_at`                                                                       |
| `product_specs`    | `id`, `product_id`, `spec`, `value`                                                                                                                   |
| `product_faqs`     | `id`, `product_id`, `question`, `answer`, `answered_by`, `answered_at`                                                                                |
| `brands`           | `id`, `name`, `logo_url`, `website_url`                                                                                                               |
| `main_categories`  | `id`, `name`, `thumbnail`                                                                                                                             |
| `categories`       | `id`, `main_category_id`, `name`                                                                                                                      |
| `profiles`         | `id`, `full_name`, `phone`, `avatar_url`, `role`                                                                                                      |
| `addresses`        | `id`, `profile_id`, `address_line`, `city`, `postal_code`, `country`, `is_default`                                                                    |
| `orders`           | `id`, `profile_id`, `currency`, `status`, `total_amount`, `delivery_fee`, `discount`, `promo_code`, `date`                                            |
| `order_items`      | `id`, `order_id`, `product_id`, `quantity`, `price`, `total`                                                                                          |
| `promo_codes`      | `id`, `code`, `discount_percentage`, `expires_at`, `is_active`                                                                                        |
| `wishlist`         | `id`, `profile_id`, `product_id`, `created_at`                                                                                                        |

## Storage buckets

| Bucket           | Usage                                 |
| ---------------- | ------------------------------------- |
| `product-images` | Product and thumbnail images (public) |
| `avatars`        | User avatar uploads                   |
