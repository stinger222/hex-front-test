import clsx from "clsx"
import { ClassArray } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...classes: ClassArray) => {
  return twMerge(clsx(classes))
}
