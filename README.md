# Bulletin Hub 

A nextjs front end project to be your news hub. The app design choices were solely based on my creativity (feel free to make suggestions!)

## WORK IN PROGRESS:
- [x] Fix some bugs with the filter
- [x] Fix date filter
- [ ] Infer remaining typescript types


## Requirements

- **Bulletin Hub backend running**
- **Docker (docker-compose)**
- **Node (npm)**

## Installation

1. **Go to the root directory of the project:**
   ```bash
   cd /your/path/to/bulletin-hub
   ```

2. **Install dependencies:**
   ```bash
   npm i
   ```

## Usage

1. **Start the docker container:**
   ```bash
   docker-compose up
   ```
   By default, the server will run at `http://localhost:3000`.

2. **Access the form in your browser:**
   ```
   http://localhost:3000/
   ```

## Project Structure

Here's an overview of the project's folder structure:

```plaintext
bh-frontend/
│
├── app/
│   ├── myaccount/
│   └── ...
│
├── components/
│   ├── article/
│   └── ...
│
├── public/
│   └── ...
│
├── utils/
│   └── cookies.ts
|   └── ...
│
├── docker-compose.yml
├── Dockerfile
├── package.json
├── ...
└── README.md
```

As you can see, the pages for the application are located at app/[pagename]

All components must be created inside the "components" folder inside a [componentname] folder

## License

This project is licensed under the GPL v3 license.

## Author

**Heitor Stael**  
Email: [heitorstael@live.com](mailto:heitorstael@live.com)