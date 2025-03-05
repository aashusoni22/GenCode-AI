# 👨‍💻 DevProject Generator

[Live Demo](https://dev-generator.netlify.app/)

DevProject Generator is a web application designed to help junior frontend developers discover and create personalized portfolio projects aligned with their skills and career goals. The platform leverages AI to generate tailored project ideas that showcase a developer's abilities and increase their employability in the tech industry.

![Screenshot 2025-03-03 143448](https://github.com/user-attachments/assets/1bedcd6b-4ec9-4e2d-a169-7a45cfd5c67e)

## Features

### Project Generation Engine
- **Skill Selection**: Interactive interface for selecting technical skills
- **Experience Level**: Slider for indicating developer experience
- **Project Complexity**: Controls for specifying desired project scope
- **Project Type Selection**: Options for project categories (e.g., e-commerce, dashboard)
- **Industry Focus**: Selection for target industry domain
- **Time Commitment**: Option to specify available development time

### Job Board Integration
- **Job Search**: Find developer roles that match your skill set
- **Filtering**: Filter jobs by type, experience level, and remote status
- **Saved Jobs**: Bookmark interesting positions for later
- **Company Research**: Quick access to research companies
- **Application Links**: Direct links to apply for positions

### Enhanced User Experience
- **Dark Mode Design**: Sleek dark theme for comfortable viewing
- **Responsive Layout**: Seamless experience across all device sizes
- **Animated Transitions**: Smooth state changes and loading indicators
- **Keyboard Navigation**: Full accessibility support

## Tech Stack

- **Frontend**: React.js with functional components and hooks
- **Styling**: Tailwind CSS for utility-first styling
- **API Integration**: Custom fetch wrappers for third-party job APIs
- **State Management**: React Context and local state management
- **Deployment**: Vercel for hosting and deployment

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devproject-generator.git
cd devproject-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
REACT_APP_RAPIDAPI_KEY=your_rapid_api_key
```

4. Start the development server:
```bash
npm start
```

## Usage

### Generating Project Ideas

1. Navigate to the "Generate Project" tab
2. Select your technical skills
3. Set your experience level
4. Choose project complexity
5. Select project type and time commitment
6. Click "Generate Project Ideas"
7. Browse through tailored project recommendations
8. Save favorites or get more details on each project

### Finding Job Opportunities

1. Navigate to the "Find Jobs" tab
2. Enter search terms and location
3. Apply filters for job type, experience level, or remote work
4. Browse job listings matched to your criteria
5. Save interesting positions
6. Click "Apply Now" to visit the application page

## Project Structure

```
devproject-generator/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Generate.jsx
│   │   ├── JobBoard.jsx
│   │   ├── ProjectResults.jsx
│   │   └── ...
│   ├── lib/
│   │   ├── jobAPI.js
│   │   └── utils.js
│   ├── App.jsx
│   └── index.js
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- User accounts and authentication
- Community sharing of project ideas
- AI-generated project templates
- Integration with GitHub for repository creation
- Progress tracking for ongoing projects
- Enhanced job matching algorithms

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenAI API](https://openai.com/api/) for project generation capabilities
- [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) for job data
- [Lucide Icons](https://lucide.dev/) for beautiful UI icons
- All the junior developers seeking to enhance their portfolios

---

Built with ❤️ by [Your Name](https://github.com/yourusername)
