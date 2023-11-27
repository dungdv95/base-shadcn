import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ComponentType,
  ForwardedRef,
  createElement,
  forwardRef
} from "react";
import { twMerge } from "tailwind-merge";

export const ClickablePlain = withProps(
  ({ type = "button", disableDefaultStyles, ...rest }) => (
    <button type={type} {...rest} />
  )
)(({ className, ...props }) => {
  return {
    ...props,
    className: twMerge(
      !props.disableDefaultStyles &&
        `
        inline-block cursor-pointer appearance-none border-0
        p-0
      `,
      !props.disabled && `cursor-pointer`,
      className
    )
  };
});

export const Clickable = withProps(ClickablePlain)(
  ({ className, ...props }) => {
    return {
      ...props,
      className: twMerge(
        `text-blue-600
        dark:text-blue-400
      `,
        className
      )
    };
  }
);

export function withProps<
  TComp extends keyof JSX.IntrinsicElements | ComponentType<any>
>(component: TComp) {
  return function <TGetterPropsIn extends Record<string, any>>(
    getProps: (
      props: ComponentPropsWithoutRef<TComp> & TGetterPropsIn
    ) => ComponentPropsWithoutRef<TComp>
  ) {
    const key = (
      typeof component === "function" ? component.name : component
    ) as string;

    const func = {
      [key]: (
        { children, ...rest }: ComponentPropsWithoutRef<TComp> & TGetterPropsIn,
        ref: ForwardedRef<ComponentPropsWithRef<TComp>["ref"]["current"]>
      ) => {
        const finalProps = getProps(rest as any);
        return createElement(
          component,
          {
            ...finalProps,
            ref
          },
          children
        );
      }
    } as const;

    return forwardRef(func[key] as (typeof func)[string]);
  };
}

export default Clickable;
