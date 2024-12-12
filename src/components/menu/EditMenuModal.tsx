/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, message, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useSingleMenuQuery} from "../../redux/api/Menu/menu";
import { useEffect } from "react";

const { TextArea } = Input;

type FormValues = {
    title: string;
    notes: string;
    slot: string;
};

const EditMenuModal = ({ id, refetch }: any) => {

    // Fetch menu data based on id
    const { data, isLoading, isError, error } = useSingleMenuQuery(id);
    // const [UpdateSingleMenuChild] = useSingleMenuUpdateMutation();

    // Ensure the form doesn't try to use `data` before it's available
    const { handleSubmit, control, reset, } = useForm<FormValues>({ defaultValues: { title: "", notes: "", slot: "", }, });



    // Reset form values once data is fetched
    useEffect(() => {
        if (data) {
            // Reset form with fetched data
            reset({
                title: data.title || '',
                notes: data.notes || '',
                slot: data.slot || 'all',
            });
        }
    }, [data, reset]);

    const onSubmit = async (formData: FormValues) => {
        try {
            console.log("Submitting Payload:", JSON.stringify(formData));

            const token = localStorage.getItem("access");

            const response = await fetch(
                `https://staging.api.ubaky.com/restaurants/info/menu/${id}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.detail || "Failed to add menu");
            }

            await response.json();
            message.success("Menu added successfully!");
            reset();
            refetch();
        } catch (error: any) {
            console.error("Error adding menu:", error);
            message.error(error.message || "Failed to add the menu.");
        }
    };





    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {(error as Error).message}</div>;
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Menu Name Field */}
                <div>
                    <label className="label">Menu Name:</label>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: "Menu Name is required",
                            minLength: {
                                value: 3,
                                message:
                                    "Menu Name must be at least 3 characters",
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="e.g Drinks"
                            />
                        )}
                    />
                </div>

                {/* Menu Notes Field */}
                <div>
                    <label className="label">Menu Notes:</label>
                    <Controller
                        name="notes"
                        control={control}
                        rules={{
                            required: "Menu Notes are required",
                            maxLength: {
                                value: 100,
                                message:
                                    "Menu Notes cannot exceed 100 characters",
                            },
                        }}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                placeholder="Menu Notes"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        )}
                    />
                </div>

                {/* Slot Field */}
                <div>
                    <label className="label">Slot:</label>
                    <Controller
                        name="slot"
                        control={control}
                        rules={{
                            required: "Please select a slot",
                        }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select a Slot"
                                style={{ width: "100%" }}
                                options={[
                                    { value: "all", label: "All" },
                                    { value: "morning", label: "Morning" },
                                    { value: "lunch", label: "Lunch" },
                                    { value: "dinner", label: "Dinner" },
                                ]}
                            />
                        )}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="add-menu-button">
                    {isLoading ? "Submitting..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditMenuModal;
