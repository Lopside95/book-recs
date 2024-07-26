import type { TextProps } from "@/pages";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const TextField = ({ name, type, label }: TextProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="">
            <FormLabel>{label}</FormLabel>
            <FormMessage className="text-red-300" />
            <FormControl>
              <Input {...field} className="w-80" />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};

export default TextField;
