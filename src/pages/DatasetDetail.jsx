import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'

const DatasetDetail = () => {
  const { datasetId } = useParams()
  const [dataset, setDataset] = useState(null)
  const [loading, setLoading] = useState(true)
  const [previewData, setPreviewData] = useState([])

  useEffect(() => {
    const loadDataset = async () => {
      try {
        const response = await fetch(`/datasets/${datasetId}.json`)
        const data = await response.json()
        setDataset(data)
        // 对于十神数据集，显示所有记录；其他数据集显示前5条
        const previewCount = datasetId === 'ten-gods' ? data.data.length : 5
        setPreviewData(data.data.slice(0, previewCount))
        setLoading(false)
      } catch (error) {
        console.error('Error loading dataset:', error)
        setLoading(false)
      }
    }

    loadDataset()
  }, [datasetId])

  const downloadDataset = () => {
    const link = document.createElement('a')
    link.href = `/datasets/${datasetId}.json`
    link.download = `${datasetId}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 生成JSON-LD结构化数据
  const generateStructuredData = () => {
    if (!dataset) return null

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": dataset.metadata.name,
      "description": dataset.metadata.description,
      "url": `${window.location.origin}/resources/${datasetId}`,
      "version": dataset.metadata.version,
      "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      "creator": {
        "@type": "Organization",
        "name": dataset.metadata.author,
        "url": window.location.origin
      },
      "dateModified": dataset.metadata.lastUpdated,
      "datePublished": dataset.metadata.lastUpdated,
      "keywords": [
        "bazi", "chinese numerology", "fate analysis", "dataset", "json",
        "heavenly stems", "earthly branches", "five elements", "ten gods"
      ],
      "distribution": [
        {
          "@type": "DataDownload",
          "encodingFormat": "application/json",
          "contentUrl": `${window.location.origin}/datasets/${datasetId}.json`,
          "name": `${datasetId}.json`
        }
      ],
      "variableMeasured": dataset.schema.fields.map(field => field.name),
      "numberOfItems": dataset.metadata.totalRecords,
      "inLanguage": "en",
      "isAccessibleForFree": true,
      "citation": `FatePath BaZi Master. (${dataset.metadata.lastUpdated}). ${dataset.metadata.name}. Available at: ${window.location.origin}/resources/${datasetId}`,
      "about": [
        {
          "@type": "Thing",
          "name": "Chinese Numerology",
          "description": "Traditional Chinese system of divination and character analysis"
        },
        {
          "@type": "Thing", 
          "name": "BaZi",
          "description": "Four Pillars of Destiny, a Chinese astrological concept"
        }
      ]
    }

    return structuredData
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-mystic-900 flex items-center justify-center">
        <div className="text-white">Loading dataset...</div>
      </div>
    )
  }

  if (!dataset) {
    return (
      <div className="pt-20 min-h-screen bg-mystic-900 flex items-center justify-center">
        <div className="text-white">Dataset not found</div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title={`${dataset.metadata.name} - BaZi Dataset`}
        description={dataset.metadata.description}
        keywords={`${datasetId}, bazi dataset, chinese numerology data, json dataset, free download`}
        structuredData={generateStructuredData()}
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-mystic-800 to-mystic-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <span className="text-4xl mr-4">📊</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {dataset.metadata.name}
                </h1>
              </div>
              <p className="text-xl text-mystic-300 mb-8 max-w-3xl mx-auto">
                {dataset.metadata.description}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-mystic-400 mb-8">
                <span>Format: {dataset.metadata.format}</span>
                <span>•</span>
                <span>Records: {dataset.metadata.totalRecords}</span>
                <span>•</span>
                <span>Version: {dataset.metadata.version}</span>
                <span>•</span>
                <span>Updated: {dataset.metadata.lastUpdated}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={downloadDataset}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-mystic-900 px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
                >
                  Download Dataset
                </button>
                <Link
                  to="/resources"
                  className="bg-mystic-700 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-mystic-600 transition-all duration-300"
                >
                  View All Datasets
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI-Friendly Citation Section */}
        <section className="py-16 bg-mystic-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Citation & AI Integration</h2>
              <p className="text-mystic-300">Ready-to-use citation formats for academic and AI applications</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-mystic-800 rounded-lg p-6 border border-mystic-700/50"
              >
                <h3 className="text-yellow-400 font-bold text-lg mb-4">Academic Citation</h3>
                <div className="bg-mystic-700/30 rounded p-4">
                  <p className="text-mystic-300 text-sm font-mono">
                    FatePath BaZi Master. ({dataset.metadata.lastUpdated}). {dataset.metadata.name}. 
                    Available at: {window.location.origin}/resources/{datasetId}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-mystic-800 rounded-lg p-6 border border-mystic-700/50"
              >
                <h3 className="text-yellow-400 font-bold text-lg mb-4">API Endpoint</h3>
                <div className="bg-mystic-700/30 rounded p-4">
                  <p className="text-mystic-300 text-sm font-mono">
                    GET {window.location.origin}/datasets/{datasetId}.json
                  </p>
                  <p className="text-mystic-400 text-xs mt-2">
                    Returns complete dataset with metadata and schema
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Field Dictionary */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Field Dictionary
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                Complete documentation of all fields in this dataset with descriptions, data types, and examples.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataset.schema.fields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-mystic-800 rounded-lg p-6 border border-mystic-700/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-yellow-400 font-bold text-lg">{field.name}</h3>
                    <span className="px-2 py-1 bg-mystic-700/50 text-mystic-300 text-xs rounded">
                      {field.type}
                    </span>
                  </div>
                  <p className="text-mystic-300 text-sm mb-4">{field.description}</p>
                  <div className="bg-mystic-700/30 rounded p-3">
                    <span className="text-mystic-400 text-xs">Example:</span>
                    <div className="text-white text-sm mt-1 font-mono">
                      {typeof field.example === 'object' 
                        ? JSON.stringify(field.example, null, 2)
                        : field.example
                      }
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Preview */}
        <section className="py-20 bg-mystic-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Data Preview
              </h2>
                             <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                 {datasetId === 'ten-gods' 
                   ? `Complete preview of all ${dataset.metadata.totalRecords} Ten Gods records.` 
                   : `Preview of the first 5 records in this dataset. Download the complete dataset to access all ${dataset.metadata.totalRecords} records.`
                 }
               </p>
            </motion.div>

            <div className="bg-mystic-900 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-mystic-800">
                      {dataset.schema.fields.map((field, index) => (
                        <th key={field.name} className="px-6 py-4 text-left text-yellow-400 font-semibold">
                          {field.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((record, recordIndex) => (
                      <tr key={recordIndex} className="border-b border-mystic-700/50">
                        {dataset.schema.fields.map((field) => (
                          <td key={field.name} className="px-6 py-4 text-mystic-300">
                            {typeof record[field.name] === 'object' 
                              ? JSON.stringify(record[field.name])
                              : String(record[field.name])
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="py-20 bg-mystic-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Usage Examples
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                Code examples showing how to use this dataset in different programming languages and applications.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">JavaScript/Node.js</h3>
                <div className="bg-mystic-800 rounded-lg p-6 border border-mystic-700/50">
                  <pre className="text-mystic-300 text-sm overflow-x-auto">
{`// Load the dataset
const dataset = require('./${datasetId}.json');

// Access metadata
console.log(dataset.metadata.name);

// Access data
dataset.data.forEach(record => {
  console.log(record);
});

// Filter by element (example for Heavenly Stems)
const woodStems = dataset.data.filter(
  stem => stem.element.includes('Wood')
);`}
                  </pre>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Python</h3>
                <div className="bg-mystic-800 rounded-lg p-6 border border-mystic-700/50">
                  <pre className="text-mystic-300 text-sm overflow-x-auto">
{`import json

# Load the dataset
with open('${datasetId}.json', 'r') as f:
    dataset = json.load(f)

# Access metadata
print(dataset['metadata']['name'])

# Access data
for record in dataset['data']:
    print(record)

# Filter by element (example for Heavenly Stems)
wood_stems = [
    stem for stem in dataset['data'] 
    if 'Wood' in stem['element']
]`}
                  </pre>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* JSON-LD Structured Data */}
        <section className="py-20 bg-mystic-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Dataset Information
              </h2>
              <p className="text-lg text-mystic-300 max-w-2xl mx-auto">
                Technical details and structured data for this dataset.
              </p>
            </motion.div>

            <div className="bg-mystic-900 rounded-lg p-8 border border-mystic-700/50">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Dataset Metadata</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-mystic-300">Name:</span>
                      <span className="text-white">{dataset.metadata.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mystic-300">Version:</span>
                      <span className="text-white">{dataset.metadata.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mystic-300">Format:</span>
                      <span className="text-white">{dataset.metadata.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mystic-300">Records:</span>
                      <span className="text-white">{dataset.metadata.totalRecords}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mystic-300">License:</span>
                      <span className="text-white">{dataset.metadata.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mystic-300">Author:</span>
                      <span className="text-white">{dataset.metadata.author}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Download Options</h3>
                  <div className="space-y-4">
                    <button
                      onClick={downloadDataset}
                      className="w-full bg-yellow-400 text-mystic-900 px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      Download JSON ({datasetId}.json)
                    </button>
                    <div className="text-mystic-400 text-sm">
                      <p>• Complete dataset with metadata and schema</p>
                      <p>• Structured for easy integration</p>
                      <p>• Includes field documentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default DatasetDetail
