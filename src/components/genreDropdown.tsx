import { trpc } from "@/utils/trpc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useFormContext } from "react-hook-form";
import { TextProps } from "@/pages";
import { useState } from "react";

const GenreDropdown = () => {
  const { control, getValues } = useFormContext();

  const { data: genres, refetch } = trpc.getGenres.useQuery();

  // const { data: authors, refetch } = trpc.author.getAuthors.useQuery(
  //   undefined,
  //   { enabled: false }
  // );

  const [fieldValue, setFieldValue] = useState();

  console.log("genres", genres);

  return (
    <>
      <FormField
        control={control}
        name="genre"
        render={({ field }) => (
          <>
            <FormItem className="">
              <FormLabel>Choose an author</FormLabel>
              <FormMessage className="text-red-200" />
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={`Choose a genre`} />
                  </SelectTrigger>
                  <SelectContent>
                    {genres?.map((x) => {
                      return (
                        <SelectItem key={x.id} value={x.name}>
                          {x.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          </>
        )}
      />
    </>
  );
};

export default GenreDropdown;
// import { trpc } from "@/utils/trpc";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { FormField } from "./ui/form";
// import { useFormContext } from "react-hook-form";
// import { TextProps } from "@/pages";
// import { useState } from "react";

// const AuthorDropdown = ({ label, name, type }: TextProps) => {
//   const { control } = useFormContext();

//   const [fieldValue, setFieldValue] = useState();

//   return (
//     <>
//       <FormField
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <Select
//             onValueChange={(value) => field.onChange(value)}
//             value={field.value}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder={`Choose a ${label}`} />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Fruits</SelectLabel>
//                 <SelectItem value="apple">Apple</SelectItem>
//                 <SelectItem value="banana">Banana</SelectItem>
//                 <SelectItem value="blueberry">Blueberry</SelectItem>
//                 <SelectItem value="grapes">Grapes</SelectItem>
//                 <SelectItem value="pineapple">Pineapple</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         )}
//       />
//     </>
//   );
// };

// export default AuthorDropdown;
