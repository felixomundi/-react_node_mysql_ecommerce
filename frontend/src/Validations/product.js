import * as yup from "yup"

const formats = [ "image/png", "image/jpeg", "image/png"]; 
export const productSchema = yup.object({
    name: yup.string().required("Product Name is Required"),
    price: yup.number().required("Price is required").moreThan("Price should be more than 0"),
    quantity: yup.number().required("Quantity is required").positive("Only positive values allowed"),
    description: yup.string().required("Description is Required"),
    file: yup.mixed().nullable().required().test(
        "FILE_SIZE",
        "Uploaded file is too big",
        (value) => !value || (value && value.size <= 1024 * 1024)
            .test(
                "FILE_FORMAT",
                "Uploaded file has unsupported format",
                (value)=>!value || (value && formats.includes(value?.type) ),
        )
    )
})