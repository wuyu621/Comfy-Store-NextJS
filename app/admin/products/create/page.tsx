import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { faker } from "@faker-js/faker";
import { createProductAction } from "@/utils/actions";

// const createProductAction = async (formData: FormData) => {
//   "use server";
//   const name = formData.get("name") as string;
//   // console.log(name);
// };

function CreateProductsPage() {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraph({ min: 10, max: 12 });

  return (
    <section>
      <h1 className="font-semibold text-2xl capitalize mb-8">create product</h1>
      <div className="border rounded-md p-8">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              name="name"
              type="text"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckBoxInput name="featured" label="featured" />
          </div>
          <SubmitButton text="Create Products" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateProductsPage;
