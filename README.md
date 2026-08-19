# 🧪 Image Processing Lab

> An interactive web-based laboratory for exploring fundamental image processing concepts through real-time visualizations and pixel-level calculations.

## 📌 Overview

**Image Processing Lab** is a simple and interactive educational application designed to demonstrate how image processing works at the pixel level.

Users can upload an image, apply different filters, inspect individual pixels, visualize convolution kernels, explore 3×3 pixel neighbourhoods, and understand the mathematical calculations behind image processing.

The project focuses on making image processing concepts **visual, interactive, and easy to understand**.

---

## ✨ Features

* 📤 Upload images using drag & drop or file selection
* 🖼️ View original and processed images
* ⚫ Grayscale conversion
* 🔄 Image inversion
* 🌫️ Blur filtering
* 🔍 Sharpening
* 📐 Sobel X edge detection
* 📐 Sobel Y edge detection
* 🧮 Laplacian edge detection
* 🔲 Interactive kernel visualization
* 🖱️ Pixel-level inspection
* 🔢 3×3 pixel neighbourhood visualization
* 📊 RGB and intensity information
* 🧠 Real-time convolution calculation
* 📥 Download processed images
* 📱 Responsive and modern UI

---

## 🔬 How It Works

The application follows a simple image-processing workflow:

```text
Upload Image
     ↓
Read Pixel Data
     ↓
Select Filter
     ↓
Apply Kernel / Processing
     ↓
Generate Processed Image
     ↓
Select Pixel
     ↓
View 3×3 Neighbourhood
     ↓
Calculate Output Pixel
```

For kernel-based filters, the application performs actual convolution on image pixel data using the selected kernel.

---

## 🧮 Supported Filters

| Filter    | Type           | Purpose                                          |
| --------- | -------------- | ------------------------------------------------ |
| Grayscale | Basic          | Converts an image to intensity values            |
| Invert    | Basic          | Inverts pixel values                             |
| Blur      | Spatial        | Smooths the image                                |
| Sharpen   | Spatial        | Enhances image details                           |
| Sobel X   | Edge Detection | Detects intensity changes in one direction       |
| Sobel Y   | Edge Detection | Detects intensity changes in the other direction |
| Laplacian | Edge Detection | Highlights rapid intensity changes               |

---

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* JavaScript
* Tailwind CSS

**Image Processing**

* HTML5 Canvas
* Canvas `ImageData`
* JavaScript-based convolution

**Icons & UI**

* Lucide React
* Framer Motion

No database or backend is required. Image processing is performed directly in the browser.

---

## 📂 Project Structure

```text
image-processing-lab/
│
├── public/
│   └── samples/
│
├── src/
│   ├── components/
│   │   ├── ImageUploader.jsx
│   │   ├── ImageViewer.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── KernelDisplay.jsx
│   │   ├── PixelInspector.jsx
│   │   └── CalculationPanel.jsx
│   │
│   ├── utils/
│   │   ├── imageProcessing.js
│   │   └── kernels.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd image-processing-lab
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

## 🎯 Project Objective

The main objective of this project is to provide a visual understanding of fundamental image processing concepts.

Instead of only studying formulas and matrices theoretically, users can interact with an image and observe how:

**Pixels → Kernels → Convolution → Processed Image**

are connected.

---

## 📚 Concepts Demonstrated

* Digital Images
* Pixels
* RGB Color Model
* Grayscale
* Pixel Intensity
* Convolution
* Spatial Filtering
* Kernels
* Edge Detection
* Sobel Operators
* Laplacian Operator
* Pixel Neighbourhoods

---

## 🔒 Privacy

Images are processed locally in the browser using HTML5 Canvas.

No image database or user account system is used.

---

## 👨‍💻 Project

Developed as a **college academic project** to demonstrate fundamental concepts of digital image processing through an interactive web application.

---

## 📄 License

This project is created for educational purposes.
