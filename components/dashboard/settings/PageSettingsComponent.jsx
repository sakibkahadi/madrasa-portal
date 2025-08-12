
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigLeft, Plus, Trash2, Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { Editor } from "@/components/blocks/editor-00/editor";

const WebsiteCMSComponent = () => {
  const router = useRouter();

  // Combined General Info Data (Header & Footer)
  const [generalData, setGeneralData] = useState({
    header: {
      logo: null,
      name: "",
    },
    footer: {
      logo: null,
      description: "",
    },
    contact: {
      address: "",
      phone: "",
      email: "",
    },
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
    }
  });

  // Banner Section Data
  const [bannerData, setBannerData] = useState({
    backgroundImage: null,
    carouselItems: [
      { title: "", backgroundImage: null }
    ]
  });

  // About Us Section Data
  const [aboutUsData, setAboutUsData] = useState({
    content: ""
  });

  // Leaders Section Data
  const [leadersData, setLeadersData] = useState({
    carouselItems: [
      { title: "", description: "", image: null }
    ]
  });

  // Gallery Section Data
  const [galleryData, setGalleryData] = useState({
    images: []
  });

  // Video Section Data
  const [videoData, setVideoData] = useState({
    youtubeLink: "",
    thumbnailLink: ""
  });

  // Handle file changes
  const handleFileChange = (e, section, field, index = null) => {
    const file = e.target.files[0];

    if (section === "general") {
      const [area, subfield] = field.split('.');
      setGeneralData({
        ...generalData,
        [area]: {
          ...generalData[area],
          [subfield]: file
        }
      });
    } else if (section === "banner") {
      if (field === "backgroundImage") {
        setBannerData({ ...bannerData, backgroundImage: file });
      } else if (field === "carouselBackgroundImage" && index !== null) {
        const updatedItems = [...bannerData.carouselItems];
        updatedItems[index].backgroundImage = file;
        setBannerData({ ...bannerData, carouselItems: updatedItems });
      }
    } else if (section === "message" && index !== null) {
      const updatedItems = [...leadersData.carouselItems];
      updatedItems[index].image = file;
      setLeadersData({ ...leadersData, carouselItems: updatedItems });
    } else if (section === "gallery") {
      const files = Array.from(e.target.files);
      setGalleryData({ ...galleryData, images: [...galleryData.images, ...files] });
    }
  };

  // Handle text input changes
  const handleInputChange = (e, section, field = null, subfield = null, index = null) => {
    if (section === "general") {
      if (field && subfield) {
        setGeneralData({
          ...generalData,
          [field]: {
            ...generalData[field],
            [subfield]: e.target.value
          }
        });
      } else if (e.target.name.includes('.')) {
        // Handle nested fields like "contact.email"
        const [area, subfield] = e.target.name.split('.');
        setGeneralData({
          ...generalData,
          [area]: {
            ...generalData[area],
            [subfield]: e.target.value
          }
        });
      }
    } else if (section === "banner" && index !== null) {
      const updatedItems = [...bannerData.carouselItems];
      updatedItems[index].title = e.target.value;
      setBannerData({ ...bannerData, carouselItems: updatedItems });
    } else if (section === "message" && index !== null) {
      const updatedItems = [...leadersData.carouselItems];
      updatedItems[index][field] = e.target.value;
      setLeadersData({ ...leadersData, carouselItems: updatedItems });
    } else if (section === "video") {
      setVideoData({ ...videoData, [e.target.name]: e.target.value });
    }
  };

  // Handle text editor changes
  const handleEditorChange = (content) => {
    setAboutUsData({ ...aboutUsData, content });
  };

  // Add carousel item for banner
  const addBannerCarouselItem = () => {
    setBannerData({
      ...bannerData,
      carouselItems: [...bannerData.carouselItems, { title: "", backgroundImage: null }]
    });
  };

  // Remove carousel item for banner
  const removeBannerCarouselItem = (index) => {
    const updatedItems = [...bannerData.carouselItems];
    updatedItems.splice(index, 1);
    setBannerData({ ...bannerData, carouselItems: updatedItems });
  };

  // Add carousel item for leaders
  const addLeadersCarouselItem = () => {
    setLeadersData({
      ...leadersData,
      carouselItems: [...leadersData.carouselItems, { title: "", description: "", image: null }]
    });
  };

  // Remove carousel item for leaders
  const removeLeadersCarouselItem = (index) => {
    const updatedItems = [...leadersData.carouselItems];
    updatedItems.splice(index, 1);
    setLeadersData({ ...leadersData, carouselItems: updatedItems });
  };

  // Remove file
  const handleRemoveFile = (section, field, index = null) => {
    if (section === "general") {
      const [area, subfield] = field.split('.');
      setGeneralData({
        ...generalData,
        [area]: {
          ...generalData[area],
          [subfield]: null
        }
      });
    } else if (section === "banner") {
      if (field === "backgroundImage") {
        setBannerData({ ...bannerData, backgroundImage: null });
      } else if (field === "carouselBackgroundImage" && index !== null) {
        const updatedItems = [...bannerData.carouselItems];
        updatedItems[index].backgroundImage = null;
        setBannerData({ ...bannerData, carouselItems: updatedItems });
      }
    } else if (section === "message" && index !== null) {
      const updatedItems = [...leadersData.carouselItems];
      updatedItems[index].image = null;
      setLeadersData({ ...leadersData, carouselItems: updatedItems });
    }
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    const updatedImages = [...galleryData.images];
    updatedImages.splice(index, 1);
    setGalleryData({ ...galleryData, images: updatedImages });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect all form data
    const formData = {
      general: generalData,
      sections: {
        banner: bannerData,
        aboutUs: aboutUsData,
        message: leadersData,
        gallery: galleryData,
        video: videoData
      }
    };

    console.log("Form data to be sent to API:", formData);
    // Here you would connect to your API
    alert("Data saved successfully! Connect to API for actual implementation.");
  };

  return (
    <div className="sm:p-5 max-w-6xl mx-auto">
      <div className="flex gap-x-4 mb-6">
        <div className="flex items-center gap-x-4">
          <div>
            <p
              className="cursor-pointer text-accent flex items-center gap-x-2 bg-gray-200 rounded-full"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowBigLeft size={40} />
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold">Website CMS</div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-6 mb-6">
            <TabsTrigger value="general">General Info</TabsTrigger>
            <TabsTrigger value="banner">Banner</TabsTrigger>
            <TabsTrigger value="aboutUs">About Us</TabsTrigger>
            <TabsTrigger value="message">Message</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>

          {/* General Info Section (Combined Header & Footer) */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Configure website identity, contact details and social links</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Website Identity</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <Label htmlFor="header-logo" className="block font-medium mb-2">
                          Header Logo
                        </Label>
                        <Input
                          id="header-logo"
                          type="file"
                          onChange={(e) => handleFileChange(e, "general", "header.logo")}
                          className="border rounded-md"
                        />
                        {generalData.header.logo && (
                          <div className="flex items-center mt-2">
                            <img src={URL.createObjectURL(generalData.header.logo)} alt="Logo Preview" className="h-16 w-16 object-cover mr-2" />
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveFile("general", "header.logo")}>
                              <X size={16} className="mr-1" /> Remove
                            </Button>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="website-name" className="block font-medium mb-2">
                          Website Name
                        </Label>
                        <Input
                          id="website-name"
                          name="header.name"
                          value={generalData.header.name}
                          onChange={(e) => handleInputChange(e, "general")}
                          className="border rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <Label htmlFor="footer-logo" className="block font-medium mb-2">
                          Footer Logo (Optional)
                        </Label>
                        <Input
                          id="footer-logo"
                          type="file"
                          onChange={(e) => handleFileChange(e, "general", "footer.logo")}
                          className="border rounded-md"
                        />
                        {generalData.footer.logo && (
                          <div className="flex items-center mt-2">
                            <img src={URL.createObjectURL(generalData.footer.logo)} alt="Logo Preview" className="h-16 w-16 object-cover mr-2" />
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveFile("general", "footer.logo")}>
                              <X size={16} className="mr-1" /> Remove
                            </Button>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="footer-description" className="block font-medium mb-2">
                          Website Description (For Footer)
                        </Label>
                        <Textarea
                          id="footer-description"
                          name="footer.description"
                          value={generalData.footer.description}
                          onChange={(e) => handleInputChange(e, "general")}
                          className="border rounded-md"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="contact-address" className="block font-medium mb-2">
                        Address
                      </Label>
                      <Textarea
                        id="contact-address"
                        name="contact.address"
                        value={generalData.contact.address}
                        onChange={(e) => handleInputChange(e, "general")}
                        className="border rounded-md"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email" className="block font-medium mb-2">
                        Email
                      </Label>
                      <Input
                        id="contact-email"
                        name="contact.email"
                        value={generalData.contact.email}
                        onChange={(e) => handleInputChange(e, "general")}
                        className="border rounded-md"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="block font-medium mb-2">
                        Phone Number
                      </Label>
                      <Input
                        id="contact-phone"
                        name="contact.phone"
                        value={generalData.contact.phone}
                        onChange={(e) => handleInputChange(e, "general")}
                        className="border rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-medium mb-4">Social Links</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="social-facebook" className="block font-medium mb-2">
                        Facebook
                      </Label>
                      <Input
                        id="social-facebook"
                        name="socialLinks.facebook"
                        value={generalData.socialLinks.facebook}
                        onChange={(e) => handleInputChange(e, "general")}
                        className="border rounded-md"
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="social-instagram" className="block font-medium mb-2">
                        Instagram
                      </Label>
                      <Input
                        id="social-instagram"
                        name="socialLinks.instagram"
                        value={generalData.socialLinks.instagram}
                        onChange={(e) => handleInputChange(e, "general")}
                        className="border rounded-md"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="social-twitter" className="block font-medium mb-2">
                        Twitter
                      </Label>
                      <Input
                        id="social-twitter"
                        name="socialLinks.twitter"
                        value={generalData.socialLinks.twitter}
                        onChange={(e) => handleInputChange(e, "general")}
                        className="border rounded-md"
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banner Section */}
          <TabsContent value="banner">
            <Card>
              <CardHeader>
                <CardTitle>Banner Section</CardTitle>
                <CardDescription>Configure the banner/hero section of your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="banner-background" className="block font-medium mb-2">
                    Background Image
                  </Label>
                  <Input
                    id="banner-background"
                    type="file"
                    onChange={(e) => handleFileChange(e, "banner", "backgroundImage")}
                    className="border rounded-md"
                  />
                  {bannerData.backgroundImage && (
                    <div className="flex items-center mt-2">
                      <img src={URL.createObjectURL(bannerData.backgroundImage)} alt="Background Preview" className="h-24 w-32 object-cover mr-2" />
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveFile("banner", "backgroundImage")}>
                        <X size={16} className="mr-1" /> Remove
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Carousel Items</h3>
                    <Button
                      type="button"
                      onClick={addBannerCarouselItem}
                      variant="outline"
                      size="sm"
                    >
                      <Plus size={16} className="mr-1" /> Add Item
                    </Button>
                  </div>

                  {bannerData.carouselItems.map((item, index) => (
                    <div key={index} className="mb-6 p-4 border rounded-md">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Item {index + 1}</h4>
                        {bannerData.carouselItems.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeBannerCarouselItem(index)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 size={16} className="mr-1" /> Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`banner-title-${index}`} className="block font-medium mb-2">
                            Title
                          </Label>
                          <Input
                            id={`banner-title-${index}`}
                            value={item.title}
                            onChange={(e) => handleInputChange(e, "banner", null, null, index)}
                            className="border rounded-md"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`banner-carousel-bg-${index}`} className="block font-medium mb-2">
                            Background Image
                          </Label>
                          <Input
                            id={`banner-carousel-bg-${index}`}
                            type="file"
                            onChange={(e) => handleFileChange(e, "banner", "carouselBackgroundImage", index)}
                            className="border rounded-md"
                          />
                          {item.backgroundImage && (
                            <div className="flex items-center mt-2">
                              <img src={URL.createObjectURL(item.backgroundImage)} alt="Carousel Background" className="h-24 w-32 object-cover mr-2" />
                              <Button variant="destructive" size="sm" onClick={() => handleRemoveFile("banner", "carouselBackgroundImage", index)}>
                                <X size={16} className="mr-1" /> Remove
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Us Section */}
          <TabsContent value="aboutUs">
            <Card>
              <CardHeader>
                <CardTitle>About Us Section</CardTitle>
                <CardDescription>Edit the content for your About Us section</CardDescription>
              </CardHeader>
              <CardContent>
                <Label className="block font-medium mb-2">Content</Label>
                <div className="border rounded-md overflow-hidden">
                  <Textarea
                    id="aboutUs-content"
                    name="content"
                    value={aboutUsData.content}
                    onChange={(e) => handleEditorChange()}
                    className="border rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaders Section */}
          <TabsContent value="message">
            <Card>
              <CardHeader>
                <CardTitle>Messages from Leaders</CardTitle>
                <CardDescription>Configure messages from organization leaders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Leader Cards</h3>
                  <Button
                    type="button"
                    onClick={addLeadersCarouselItem}
                    variant="outline"
                    size="sm"
                  >
                    <Plus size={16} className="mr-1" /> Add Leader
                  </Button>
                </div>

                {leadersData.carouselItems.map((item, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Leader {index + 1}</h4>
                      {leadersData.carouselItems.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeLeadersCarouselItem(index)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 size={16} className="mr-1" /> Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`leader-title-${index}`} className="block font-medium mb-2">
                          Name/Title
                        </Label>
                        <Input
                          id={`leader-title-${index}`}
                          value={item.title}
                          onChange={(e) => handleInputChange(e, "leaders", "title", null, index)}
                          className="border rounded-md"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`leader-image-${index}`} className="block font-medium mb-2">
                          Image
                        </Label>
                        <Input
                          id={`leader-image-${index}`}
                          type="file"
                          onChange={(e) => handleFileChange(e, "leaders", "image", index)}
                          className="border rounded-md"
                        />
                        {item.image && (
                          <div className="flex items-center mt-2">
                            <img src={URL.createObjectURL(item.image)} alt="Leader" className="h-24 w-24 object-cover rounded-full mr-2" />
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveFile("leaders", "image", index)}>
                              <X size={16} className="mr-1" /> Remove
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor={`leader-description-${index}`} className="block font-medium mb-2">
                          Message
                        </Label>
                        <Textarea
                          id={`leader-description-${index}`}
                          value={item.description}
                          onChange={(e) => handleInputChange(e, "leaders", "description", null, index)}
                          className="border rounded-md"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Section */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Section</CardTitle>
                <CardDescription>Upload and manage images for your gallery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="gallery-images" className="block font-medium mb-2">
                    Upload Images
                  </Label>
                  <Input
                    id="gallery-images"
                    type="file"
                    multiple
                    onChange={(e) => handleFileChange(e, "gallery", "images")}
                    className="border rounded-md"
                  />
                </div>

                {galleryData.images.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Gallery Images</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {galleryData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Gallery ${index}`}
                            className="h-32 w-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeGalleryImage(index)}
                              className="w-8 h-8 p-0 flex items-center justify-center"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Section */}
          <TabsContent value="video">
            <Card>
              <CardHeader>
                <CardTitle>Video Section</CardTitle>
                <CardDescription>Configure the video section of your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="youtube-link" className="block font-medium mb-2">
                      YouTube Video Link
                    </Label>
                    <Input
                      id="youtube-link"
                      name="youtubeLink"
                      value={videoData.youtubeLink}
                      onChange={(e) => handleInputChange(e, "video")}
                      className="border rounded-md"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="thumbnail-link" className="block font-medium mb-2">
                      Custom Thumbnail Link (Optional)
                    </Label>
                    <Input
                      id="thumbnail-link"
                      name="thumbnailLink"
                      value={videoData.thumbnailLink}
                      onChange={(e) => handleInputChange(e, "video")}
                      className="border rounded-md"
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>
                </div>

                {videoData.youtubeLink && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Video Preview</h3>
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="font-medium">YouTube Video Added</p>
                        <p className="text-sm text-gray-500 mt-2">{videoData.youtubeLink}</p>
                        {videoData.thumbnailLink && (
                          <p className="text-sm text-gray-500 mt-1">Custom thumbnail will be used</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-800"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WebsiteCMSComponent;