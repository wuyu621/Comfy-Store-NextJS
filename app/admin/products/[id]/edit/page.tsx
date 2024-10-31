import FormContainer from "@/components/form/FormContainer";
import {
  fetchAdminProductDetail,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/actions";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import { SubmitButton } from "@/components/form/Buttons";
import ImageInputContainer from "@/components/form/ImageInputContainer";

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProductDetail(id);
  const { name, company, image, price, description, featured } = product;

  return (
    <section>
      <h1 className="font-semibold text-2xl capitalize mb-8">edit product</h1>
      <div className="border rounded-md p-8">
        {/* Image Input Container */}
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={image}
        >
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="url" value={image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={id} />
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
            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckBoxInput
              name="featured"
              label="featured"
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text="Update Products" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditProductPage;
