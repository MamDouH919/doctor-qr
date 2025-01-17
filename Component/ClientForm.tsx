"use client";
import { Grid2 as Grid, Paper, Stack, Typography, Button, IconButton, Input } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import ControlMUITextField from './ControlMUItextField';
import MuiSwitch from './MuiSwitch';
import MuiSelect from './MuiSelect';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ClientForm = ({
    id,
}: {
    id?: string;
}) => {
    const { control, handleSubmit, setValue, reset } = useForm({
        defaultValues: {
            videos: [{ path: "", title: "" }],
            faq: [{ question: "", answer: "" }],
            articles: [{ title: "", description: "" }],
            social: [{ type: "", link: "" }],
            active: false,
            name: "",
            title: "",
            color: "",
            lang: "",
            about: "",
            phone: "",
            whatsApp: "",
            description: "",
            image: "",
            domain: "",
        },
    });

    // Now, videos are correctly included in the `useFieldArray` hook
    const faqArray = useFieldArray({ control, name: "faq" });
    const videosArray = useFieldArray({ control, name: "videos" });
    const articlesArray = useFieldArray({ control, name: "articles" });
    const socialArray = useFieldArray({ control, name: "social" });

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            if (id) {
                data.id = id;
                // Make a PUT request to your API endpoint
                const response = await axios.post(`/api/updateClient`, data);
                console.log("Client updated successfully:", response.data);
                alert("Client updated successfully!");
            } else {
                // Make a POST request to your API endpoint
                const response = await axios.post("/api/newClient", data);
                console.log("Client saved successfully:", response.data);
                alert("Client saved successfully!");
            }
        } catch (error: any) {
            // Handle error
            alert(`Failed to save client: ${error.response?.data?.message || error.message}`);
        }
    };

    const router = useRouter();
    useEffect(() => {
        if (id) {
            console.log("id", id);
            // Fetch data from the server
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/clientById?id=${id}`);
                    console.log(response.data);
                    setValue("domain", response.data.domain);
                    setValue("name", response.data.name);
                    setValue("title", response.data.title);
                    setValue("color", response.data.color);
                    setValue("lang", response.data.lang);
                    setValue("about", response.data.about);
                    setValue("phone", response.data.phone);
                    setValue("whatsApp", response.data.whatsApp);
                    setValue("description", response.data.description);
                    setValue("image", response.data.image);
                    setValue("active", response.data.active);
                    setValue("faq", response.data.faq);
                    setValue("articles", response.data.articles);
                    setValue("social", response.data.social);
                    setValue("videos", response.data.videos);
                    setValue("phone", response.data.phone);
                    setValue("whatsApp", response.data.whatsApp);
                } catch {
                    router.push('/admin');
                }
            };

            fetchData();
        } else {
            setValue("active", true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target?.result as string);
                    console.log(jsonData);
                    
                    reset(jsonData); // Populate the form with the uploaded JSON data
                } catch {
                    alert("Invalid JSON file");
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack p={2} spacing={2}>
                <Paper>
                    <Stack p={2} spacing={2}>
                        <Input
                            type="file"
                            inputProps={{ accept: "application/json" }}
                            onChange={handleJsonUpload}
                        />
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography>Create Client</Typography>
                            <MuiSwitch
                                edge="end"
                                name="active"
                                label={"Active"}
                                control={control}
                            />
                        </Stack>
                        <Grid container spacing={2} m={0}>
                            {/* Basic Info Fields */}
                            {["domain", "name", "title", "color", "image", "description", "phone", "whatsApp"].map((field) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={field}>
                                    <ControlMUITextField
                                        label={field}
                                        control={control}
                                        name={field}
                                        rules={{ required: "This field is required" }}
                                    />
                                </Grid>
                            ))}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <MuiSelect
                                    name="lang"
                                    label={"Language"}
                                    control={control}
                                    variant="filled"
                                    data={[
                                        { value: "ar", key: "Arabic" },
                                        { value: "en", key: "English" },
                                    ]}
                                    rules={{ required: "This field is required" }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <ControlMUITextField
                                    label={"About"}
                                    control={control}
                                    name="about"
                                    rows={4}
                                    multiline
                                    rules={{ required: "This field is required" }}
                                />
                            </Grid>
                        </Grid>

                        {/* FAQ Section */}
                        <Typography variant="h6">FAQs</Typography>
                        {faqArray.fields.map((item, index) => (
                            <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                                <ControlMUITextField
                                    label={`Question ${index + 1}`}
                                    control={control}
                                    name={`faq.${index}.question`}
                                    rules={{ required: "Question is required" }}
                                />
                                <ControlMUITextField
                                    label={`Answer ${index + 1}`}
                                    control={control}
                                    name={`faq.${index}.answer`}
                                    rules={{ required: "Answer is required" }}
                                />
                                <IconButton onClick={() => faqArray.remove(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ))}
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => faqArray.append({ question: "", answer: "" })}
                        >
                            Add FAQ
                        </Button>

                        {/* Videos Section */}
                        <Typography variant="h6">Videos</Typography>
                        {videosArray.fields.map((item, index) => (
                            <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                                <ControlMUITextField
                                    label={`Video URL ${index + 1}`}
                                    control={control}
                                    name={`videos.${index}.path`}
                                    rules={{ required: "Video URL is required" }}
                                />
                                <ControlMUITextField
                                    label={`Video title ${index + 1}`}
                                    control={control}
                                    name={`videos.${index}.title`}
                                    rules={{ required: "Video URL is required" }}
                                />
                                <IconButton onClick={() => videosArray.remove(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ))}
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => videosArray.append({ path: "", title: "" })}
                        >
                            Add Video
                        </Button>

                        {/* Articles Section */}
                        <Typography variant="h6">Articles</Typography>
                        {articlesArray.fields.map((item, index) => (
                            <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                                <ControlMUITextField
                                    label={`title ${index + 1}`}
                                    control={control}
                                    name={`articles.${index}.title`}
                                    rules={{ required: "Question is required" }}
                                />
                                <ControlMUITextField
                                    label={`description ${index + 1}`}
                                    control={control}
                                    name={`articles.${index}.description`}
                                    rules={{ required: "Answer is required" }}
                                />
                                <IconButton onClick={() => articlesArray.remove(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ))}
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => articlesArray.append({ title: "", description: "" })}
                        >
                            Add Article
                        </Button>
                        {socialArray.fields.map((item, index) => (
                            <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                                <MuiSelect
                                    name={`social.${index}.type`}
                                    label={`type ${index + 1}`}
                                    control={control}
                                    variant="filled"
                                    data={[
                                        { value: "facebook", key: "Facebook" },
                                        { value: "instagram", key: "Instagram" },
                                        { value: "tikTok", key: "TikTok" },
                                        { value: "twitter", key: "Twitter" },
                                        { value: "snapChat", key: "SnapChat" },
                                        { value: "youtube", key: "Youtube" },
                                        { value: "group", key: "Group" },
                                        { value: "Share", key: "Share" },
                                        { value: "website", key: "Website" },
                                    ]}
                                    rules={{ required: "This field is required" }}
                                />
                                <ControlMUITextField
                                    label={`link ${index + 1}`}
                                    control={control}
                                    name={`social.${index}.link`}
                                    rules={{ required: "link is required" }}
                                />
                                <IconButton onClick={() => socialArray.remove(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ))}
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => socialArray.append({ type: "", link: "" })}
                        >
                            Add Social
                        </Button>
                    </Stack>
                </Paper>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Stack>
        </form>
    );
};

export default ClientForm;
