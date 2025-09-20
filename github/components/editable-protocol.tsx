"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  CheckCircle,
  AlertTriangle,
  Zap,
  Cpu,
  Gauge,
  FileText,
  Calendar,
  Clock,
  Settings,
  Activity,
  TrendingUp,
  Shield,
  Wrench,
  Download,
  Edit3,
  Save,
  Github,
} from "lucide-react"
import { jsPDF } from "jspdf"

interface ProtocolData {
  vehicleInfo: {
    make: string
    model: string
    ecuType: string
    technician: string
  }
  diagnosticScore: number
  voltage: number
  systemStatus: string
  recommendations: Array<{
    type: "success" | "warning" | "info"
    title: string
    description: string
  }>
  testResults: Array<{
    test: string
    status: string
    passed: boolean
  }>
}

const voltageData = [
  { time: "0s", voltage: 12.1, current: 2.3 },
  { time: "5s", voltage: 12.4, current: 2.1 },
  { time: "10s", voltage: 12.6, current: 1.9 },
  { time: "15s", voltage: 12.8, current: 1.8 },
  { time: "20s", voltage: 13.2, current: 1.6 },
  { time: "25s", voltage: 13.4, current: 1.5 },
]

const diagnosticData = [
  { component: "CPU", status: 98, color: "#8b5cf6" },
  { component: "RAM", status: 95, color: "#06b6d4" },
  { component: "Flash", status: 92, color: "#10b981" },
  { component: "EEPROM", status: 89, color: "#f59e0b" },
]

const errorCodes = [
  { name: "Keine Fehler", value: 85, color: "#10b981" },
  { name: "Sporadische Fehler", value: 12, color: "#f59e0b" },
  { name: "Kritische Fehler", value: 3, color: "#ef4444" },
]

export function EditableProtocol() {
  const [isEditing, setIsEditing] = useState(false)
  const [protocolData, setProtocolData] = useState<ProtocolData>({
    vehicleInfo: {
      make: "BMW",
      model: "320d E90",
      ecuType: "DME 8506924",
      technician: "System Auto",
    },
    diagnosticScore: 94.2,
    voltage: 13.4,
    systemStatus: "FUNKTIONSFÄHIG",
    recommendations: [
      {
        type: "success",
        title: "Steuergerät funktionsfähig",
        description: "Alle kritischen Systeme arbeiten innerhalb der Spezifikationen.",
      },
      {
        type: "warning",
        title: "Aktuator-Kalibrierung empfohlen",
        description:
          "Geringfügige Abweichungen bei Stellglied-Ansteuerung festgestellt. Kalibrierung in 6 Monaten empfohlen.",
      },
      {
        type: "success",
        title: "Software aktuell",
        description: "Firmware Version 2.1.4 ist die neueste verfügbare Version.",
      },
    ],
    testResults: [
      { test: "Kommunikationstest", status: "BESTANDEN", passed: true },
      { test: "Speicher-Integrität", status: "BESTANDEN", passed: true },
      { test: "Sensor-Kalibrierung", status: "BESTANDEN", passed: true },
      { test: "Aktuator-Test", status: "WARNUNG", passed: false },
      { test: "Fehlercode-Analyse", status: "BESTANDEN", passed: true },
    ],
  })

  const currentDate = new Date().toLocaleDateString("de-DE")
  const currentTime = new Date().toLocaleTimeString("de-DE")
  const protocolId = `ECU-${Math.random().toString(36).substr(2, 8).toUpperCase()}`

  const exportToWord = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Steuergerät Diagnose Protokoll</title>
        <style>
          body { font-family: 'Courier New', monospace; margin: 20px; }
          .header { border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; }
          .title { font-size: 24px; font-weight: bold; color: #333; }
          .subtitle { font-size: 14px; color: #666; }
          .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-top: 15px; }
          .info-item { font-size: 12px; }
          .info-label { color: #666; }
          .info-value { font-weight: bold; }
          .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
          .section-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; }
          .status-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .status-card { padding: 15px; background: #f9f9f9; border: 1px solid #eee; }
          .status-value { font-size: 20px; font-weight: bold; }
          .recommendations { margin-top: 20px; }
          .recommendation { padding: 10px; margin: 10px 0; background: #f5f5f5; border-left: 4px solid #ccc; }
          .recommendation.success { border-left-color: #10b981; }
          .recommendation.warning { border-left-color: #f59e0b; }
          .test-results { margin-top: 15px; }
          .test-item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
          .footer { margin-top: 30px; padding: 15px; border-top: 1px solid #ccc; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">STEUERGERÄT DIAGNOSE PROTOKOLL</div>
          <div class="subtitle">Automatisierte Systemanalyse v2.1.4</div>
          <div style="float: right; text-align: right;">
            <div>📅 ${currentDate}</div>
            <div>🕐 ${currentTime}</div>
          </div>
          <div style="clear: both;"></div>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Protokoll-ID:</div>
              <div class="info-value">${protocolId}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Fahrzeug:</div>
              <div class="info-value">${protocolData.vehicleInfo.make} ${protocolData.vehicleInfo.model}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Steuergerät:</div>
              <div class="info-value">${protocolData.vehicleInfo.ecuType}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Techniker:</div>
              <div class="info-value">${protocolData.vehicleInfo.technician}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">STATUS ÜBERSICHT</div>
          <div class="status-grid">
            <div class="status-card">
              <div>SYSTEM STATUS</div>
              <div class="status-value" style="color: #10b981;">${protocolData.systemStatus}</div>
              <div style="font-size: 12px; color: #666;">Alle Hauptsysteme operativ</div>
            </div>
            <div class="status-card">
              <div>DIAGNOSE SCORE</div>
              <div class="status-value" style="color: #8b5cf6;">${protocolData.diagnosticScore}%</div>
              <div style="font-size: 12px; color: #666;">Systemintegrität bestätigt</div>
            </div>
            <div class="status-card">
              <div>SPANNUNG</div>
              <div class="status-value" style="color: #06b6d4;">${protocolData.voltage}V</div>
              <div style="font-size: 12px; color: #666;">Bordnetz stabil</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">DURCHGEFÜHRTE TESTS</div>
          <div class="test-results">
            ${protocolData.testResults
              .map(
                (test) => `
              <div class="test-item">
                <span>${test.test}:</span>
                <span style="color: ${test.passed ? "#10b981" : "#f59e0b"};">${test.status}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="section">
          <div class="section-title">TECHNISCHE PARAMETER</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h4>HARDWARE SPEZIFIKATIONEN</h4>
              <div style="font-size: 12px;">
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Prozessor:</span>
                  <span>ARM Cortex-M4 @ 168MHz</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Flash Speicher:</span>
                  <span>2048 KB (92% belegt)</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>RAM:</span>
                  <span>192 KB (78% belegt)</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>EEPROM:</span>
                  <span>16 KB (45% belegt)</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Betriebstemperatur:</span>
                  <span>67°C (Normal)</span>
                </div>
              </div>
            </div>
            <div>
              <h4>MESSWERTE</h4>
              <div style="font-size: 12px;">
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Min. Spannung:</span>
                  <span>12.1V</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Max. Spannung:</span>
                  <span>13.4V</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Ø Strom:</span>
                  <span>1.87A</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                  <span>Stabilität:</span>
                  <span style="color: #10b981;">98.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">EMPFEHLUNGEN & MASSNAHMEN</div>
          <div class="recommendations">
            ${protocolData.recommendations
              .map(
                (rec) => `
              <div class="recommendation ${rec.type}">
                <div style="font-weight: bold; margin-bottom: 5px;">${rec.title}</div>
                <div style="font-size: 12px;">${rec.description}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <div class="footer">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <span>© 2024 ECU Diagnostics Pro</span>
              <span> • </span>
              <span>Zertifiziert nach ISO 14229</span>
            </div>
            <div>
              📄 Protokoll generiert: ${currentDate} ${currentTime}
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Steuergeraet_Protokoll_${protocolId}_${currentDate.replace(/\./g, "-")}.doc`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportToPDF = async () => {
    console.log("[v0] Starting PDF export...")

    try {
      const tempContainer = document.createElement("div")
      tempContainer.style.position = "absolute"
      tempContainer.style.left = "-9999px"
      tempContainer.style.top = "0"
      tempContainer.style.width = "800px"
      tempContainer.style.backgroundColor = "#ffffff"
      tempContainer.style.fontFamily = "Courier New, monospace"
      tempContainer.style.padding = "20px"

      tempContainer.innerHTML = `
        <div style="font-family: 'Courier New', monospace; padding: 20px; max-width: 800px; background: white;">
          <div style="border: 2px solid #333; padding: 20px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <div>
                <h1 style="font-size: 24px; font-weight: bold; margin: 0; color: #333;">STEUERGERÄT DIAGNOSE PROTOKOLL</h1>
                <p style="font-size: 14px; color: #666; margin: 5px 0;">Automatisierte Systemanalyse v2.1.4</p>
              </div>
              <div style="text-align: right; font-size: 12px; color: #666;">
                <div>📅 ${currentDate}</div>
                <div>🕐 ${currentTime}</div>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; font-size: 12px;">
              <div><span style="color: #666;">Protokoll-ID:</span><br><strong>${protocolId}</strong></div>
              <div><span style="color: #666;">Fahrzeug:</span><br><strong>${protocolData.vehicleInfo.make} ${protocolData.vehicleInfo.model}</strong></div>
              <div><span style="color: #666;">Steuergerät:</span><br><strong>${protocolData.vehicleInfo.ecuType}</strong></div>
              <div><span style="color: #666;">Techniker:</span><br><strong>${protocolData.vehicleInfo.technician}</strong></div>
            </div>
          </div>

          <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px;">
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #333;">STATUS ÜBERSICHT</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
              <div style="padding: 15px; background: #f9f9f9; border: 1px solid #eee; text-align: center;">
                <div style="font-size: 12px; color: #666;">SYSTEM STATUS</div>
                <div style="font-size: 20px; font-weight: bold; color: #10b981; margin: 5px 0;">${protocolData.systemStatus}</div>
                <div style="font-size: 10px; color: #666;">Alle Hauptsysteme operativ</div>
              </div>
              <div style="padding: 15px; background: #f9f9f9; border: 1px solid #eee; text-align: center;">
                <div style="font-size: 12px; color: #666;">DIAGNOSE SCORE</div>
                <div style="font-size: 20px; font-weight: bold; color: #8b5cf6; margin: 5px 0;">${protocolData.diagnosticScore}%</div>
                <div style="font-size: 10px; color: #666;">Systemintegrität bestätigt</div>
              </div>
              <div style="padding: 15px; background: #f9f9f9; border: 1px solid #eee; text-align: center;">
                <div style="font-size: 12px; color: #666;">SPANNUNG</div>
                <div style="font-size: 20px; font-weight: bold; color: #06b6d4; margin: 5px 0;">${protocolData.voltage}V</div>
                <div style="font-size: 10px; color: #666;">Bordnetz stabil</div>
              </div>
            </div>
          </div>

          <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px;">
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #333;">DURCHGEFÜHRTE TESTS</h2>
            ${protocolData.testResults
              .map(
                (test) => `
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 12px;">
                <span>${test.test}:</span>
                <span style="color: ${test.passed ? "#10b981" : "#f59e0b"}; font-weight: bold;">${test.status}</span>
              </div>
            `,
              )
              .join("")}
          </div>

          <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px;">
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #333;">TECHNISCHE PARAMETER</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 12px;">
              <div>
                <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">HARDWARE SPEZIFIKATIONEN</h3>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Prozessor:</span><span>ARM Cortex-M4 @ 168MHz</span></div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Flash Speicher:</span><span>2048 KB (92% belegt)</span></div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>RAM:</span><span>192 KB (78% belegt)</span></div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>EEPROM:</span><span>16 KB (45% belegt)</span></div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Betriebstemperatur:</span><span>67°C (Normal)</span></div>
              </div>
              <div>
                <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">MESSWERTE</h3>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Min. Spannung:</span><span>12.1V</span></div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Max. Spannung:</span><span>13.4V</span></div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Ø Strom:</span><span>1.87A</span></div>
                <div style="display: flex; justify-content: space-between; margin: 5px 0;"><span>Stabilität:</span><span style="color: #10b981;">98.5%</span></div>
              </div>
            </div>
          </div>

          <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 20px;">
            <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #333;">EMPFEHLUNGEN & MASSNAHMEN</h2>
            ${protocolData.recommendations
              .map(
                (rec) => `
              <div style="padding: 10px; margin: 10px 0; background: #f5f5f5; border-left: 4px solid ${rec.type === "success" ? "#10b981" : "#f59e0b"}; font-size: 12px;">
                <div style="font-weight: bold; margin-bottom: 5px;">${rec.title}</div>
                <div>${rec.description}</div>
              </div>
            `,
              )
              .join("")}
          </div>

          <div style="border-top: 2px solid #333; padding: 15px; font-size: 12px; color: #666;">
            <div style="display: flex; justify-content: space-between;">
              <div>© 2024 ECU Diagnostics Pro • Zertifiziert nach ISO 14229</div>
              <div>📄 Protokoll generiert: ${currentDate} ${currentTime}</div>
            </div>
          </div>
        </div>
      `

      document.body.appendChild(tempContainer)
      console.log("[v0] Temporary container created and added to DOM")

      await new Promise((resolve) => setTimeout(resolve, 100))

      const html2canvas = await import("html2canvas")
      console.log("[v0] html2canvas imported successfully")

      const canvas = await html2canvas.default(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: 800,
        height: tempContainer.scrollHeight,
        logging: false,
      })

      console.log("[v0] Canvas created successfully")

      document.body.removeChild(tempContainer)

      const imgData = canvas.toDataURL("image/png")
      const doc = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        doc.addPage()
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      doc.save(`Steuergeraet_Protokoll_${protocolId}_${currentDate.replace(/\./g, "-")}.pdf`)
      console.log("[v0] PDF saved successfully")
    } catch (error) {
      console.error("[v0] PDF generation failed:", error)

      try {
        const doc = new jsPDF("p", "mm", "a4")
        doc.setFont("courier")
        doc.setFontSize(16)
        doc.text("STEUERGERÄT DIAGNOSE PROTOKOLL", 20, 20)

        doc.setFontSize(12)
        doc.text(`Protokoll-ID: ${protocolId}`, 20, 35)
        doc.text(`Datum: ${currentDate} ${currentTime}`, 20, 45)
        doc.text(`Fahrzeug: ${protocolData.vehicleInfo.make} ${protocolData.vehicleInfo.model}`, 20, 55)
        doc.text(`Steuergerät: ${protocolData.vehicleInfo.ecuType}`, 20, 65)
        doc.text(`Techniker: ${protocolData.vehicleInfo.technician}`, 20, 75)

        doc.setFontSize(14)
        doc.text("STATUS ÜBERSICHT", 20, 90)
        doc.setFontSize(12)
        doc.text(`System Status: ${protocolData.systemStatus}`, 20, 105)
        doc.text(`Diagnose Score: ${protocolData.diagnosticScore}%`, 20, 115)
        doc.text(`Spannung: ${protocolData.voltage}V`, 20, 125)

        doc.setFontSize(14)
        doc.text("DURCHGEFÜHRTE TESTS", 20, 140)
        doc.setFontSize(10)
        let yPos = 155
        protocolData.testResults.forEach((test) => {
          doc.text(`${test.test}: ${test.status}`, 20, yPos)
          yPos += 10
        })

        doc.setFontSize(14)
        doc.text("EMPFEHLUNGEN", 20, yPos + 10)
        doc.setFontSize(10)
        yPos += 25
        protocolData.recommendations.forEach((rec) => {
          const lines = doc.splitTextToSize(`• ${rec.title}: ${rec.description}`, 170)
          doc.text(lines, 20, yPos)
          yPos += lines.length * 5 + 5
        })

        doc.save(`Steuergeraet_Protokoll_${protocolId}_${currentDate.replace(/\./g, "-")}.pdf`)
        console.log("[v0] Fallback PDF saved successfully")
      } catch (fallbackError) {
        console.error("[v0] Fallback PDF generation also failed:", fallbackError)
        alert("PDF-Export fehlgeschlagen. Bitte versuchen Sie es erneut oder verwenden Sie den Word-Export.")
      }
    }
  }

  const updateVehicleInfo = (field: keyof typeof protocolData.vehicleInfo, value: string) => {
    setProtocolData((prev) => ({
      ...prev,
      vehicleInfo: { ...prev.vehicleInfo, [field]: value },
    }))
  }

  const updateRecommendation = (index: number, field: "title" | "description", value: string) => {
    setProtocolData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((rec, i) => (i === index ? { ...rec, [field]: value } : rec)),
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-mono">
      {/* Control Panel */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"} size="sm">
            {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
            {isEditing ? "Speichern" : "Bearbeiten"}
          </Button>
          <Button onClick={exportToPDF} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Als PDF exportieren
          </Button>
          <Button
            onClick={() => {
              const instructions = `
# Steuergerät Diagnose Protokoll - GitHub Setup

## 1. Code herunterladen
- Klicken Sie auf die drei Punkte (⋯) oben rechts im v0 Interface
- Wählen Sie "Download ZIP"
- Entpacken Sie die Datei auf Ihrem Computer

## 2. GitHub Repository erstellen
- Gehen Sie zu github.com und loggen Sie sich ein
- Klicken Sie auf "New repository" (grüner Button)
- Geben Sie einen Namen ein: z.B. "ecu-diagnose-protokoll"
- Wählen Sie "Public" oder "Private"
- Klicken Sie "Create repository"

## 3. Code hochladen
**Option A - Über GitHub Web Interface:**
- Klicken Sie "uploading an existing file"
- Ziehen Sie alle Dateien aus dem entpackten Ordner hinein
- Schreiben Sie eine Commit-Nachricht: "Initial commit"
- Klicken Sie "Commit changes"

**Option B - Mit Git (falls installiert):**
\`\`\`bash
cd /pfad/zum/entpackten/ordner
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/IHR-USERNAME/ecu-diagnose-protokoll.git
git push -u origin main
\`\`\`

## 4. Bearbeitung
- Dateien können direkt auf GitHub bearbeitet werden (Stift-Symbol)
- Oder klonen Sie das Repository lokal für erweiterte Bearbeitung
- Hauptdateien zum Anpassen:
  - \`components/editable-protocol.tsx\` - Hauptprotokoll
  - \`app/globals.css\` - Styling
  - \`app/page.tsx\` - Hauptseite

## 5. Deployment (optional)
- Verbinden Sie Ihr GitHub Repository mit Vercel
- Automatische Deployments bei jeder Änderung
- Kostenlos für persönliche Projekte
              `

              const blob = new Blob([instructions], { type: "text/markdown" })
              const url = URL.createObjectURL(blob)
              const link = document.createElement("a")
              link.href = url
              link.download = "GitHub_Setup_Anleitung.md"
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
            }}
            variant="outline"
            size="sm"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub Anleitung
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-card border border-border rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
              <Cpu className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">STEUERGERÄT DIAGNOSE PROTOKOLL</h1>
              <p className="text-sm text-muted-foreground font-sans">Automatisierte Systemanalyse v2.1.4</p>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-4 h-4" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Protokoll-ID:</span>
            <div className="font-bold">{protocolId}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Fahrzeug:</span>
            {isEditing ? (
              <div className="space-y-1">
                <Input
                  value={protocolData.vehicleInfo.make}
                  onChange={(e) => updateVehicleInfo("make", e.target.value)}
                  className="h-6 text-xs"
                  placeholder="Marke"
                />
                <Input
                  value={protocolData.vehicleInfo.model}
                  onChange={(e) => updateVehicleInfo("model", e.target.value)}
                  className="h-6 text-xs"
                  placeholder="Modell"
                />
              </div>
            ) : (
              <div className="font-bold">
                {protocolData.vehicleInfo.make} {protocolData.vehicleInfo.model}
              </div>
            )}
          </div>
          <div>
            <span className="text-muted-foreground">Steuergerät:</span>
            {isEditing ? (
              <Input
                value={protocolData.vehicleInfo.ecuType}
                onChange={(e) => updateVehicleInfo("ecuType", e.target.value)}
                className="h-6 text-xs"
                placeholder="ECU Typ"
              />
            ) : (
              <div className="font-bold">{protocolData.vehicleInfo.ecuType}</div>
            )}
          </div>
          <div>
            <span className="text-muted-foreground">Techniker:</span>
            {isEditing ? (
              <Input
                value={protocolData.vehicleInfo.technician}
                onChange={(e) => updateVehicleInfo("technician", e.target.value)}
                className="h-6 text-xs"
                placeholder="Techniker"
              />
            ) : (
              <div className="font-bold">{protocolData.vehicleInfo.technician}</div>
            )}
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-chart-4" />
              <span>SYSTEM STATUS</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Input
                value={protocolData.systemStatus}
                onChange={(e) => setProtocolData((prev) => ({ ...prev, systemStatus: e.target.value }))}
                className="text-2xl font-bold text-chart-4 border-none p-0 h-auto"
              />
            ) : (
              <div className="text-2xl font-bold text-chart-4">{protocolData.systemStatus}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Alle Hauptsysteme operativ</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Activity className="w-4 h-4 text-accent" />
              <span>DIAGNOSE SCORE</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Input
                type="number"
                value={protocolData.diagnosticScore}
                onChange={(e) =>
                  setProtocolData((prev) => ({ ...prev, diagnosticScore: Number.parseFloat(e.target.value) }))
                }
                className="text-2xl font-bold text-accent border-none p-0 h-auto"
                step="0.1"
                min="0"
                max="100"
              />
            ) : (
              <div className="text-2xl font-bold text-accent">{protocolData.diagnosticScore}%</div>
            )}
            <Progress value={protocolData.diagnosticScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Systemintegrität bestätigt</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Zap className="w-4 h-4 text-chart-2" />
              <span>SPANNUNG</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Input
                type="number"
                value={protocolData.voltage}
                onChange={(e) => setProtocolData((prev) => ({ ...prev, voltage: Number.parseFloat(e.target.value) }))}
                className="text-2xl font-bold text-chart-2 border-none p-0 h-auto"
                step="0.1"
                min="0"
              />
            ) : (
              <div className="text-2xl font-bold text-chart-2">{protocolData.voltage}V</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Bordnetz stabil</p>
          </CardContent>
        </Card>
      </div>

      {/* Voltage Analysis */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span>SPANNUNGS- UND STROMANALYSE</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={voltageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#6b7280" />
                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="voltage" stroke="#8b5cf6" strokeWidth={2} name="Spannung (V)" />
                <Line type="monotone" dataKey="current" stroke="#06b6d4" strokeWidth={2} name="Strom (A)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
            <div className="bg-muted p-3 rounded-sm">
              <div className="text-muted-foreground">Min. Spannung</div>
              <div className="font-bold text-lg">12.1V</div>
            </div>
            <div className="bg-muted p-3 rounded-sm">
              <div className="text-muted-foreground">Max. Spannung</div>
              <div className="font-bold text-lg">13.4V</div>
            </div>
            <div className="bg-muted p-3 rounded-sm">
              <div className="text-muted-foreground">Ø Strom</div>
              <div className="font-bold text-lg">1.87A</div>
            </div>
            <div className="bg-muted p-3 rounded-sm">
              <div className="text-muted-foreground">Stabilität</div>
              <div className="font-bold text-lg text-chart-4">98.5%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-accent" />
              <span>KOMPONENTEN STATUS</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diagnosticData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="component" tick={{ fontSize: 12 }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="status" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center space-x-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>FEHLERCODE VERTEILUNG</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorCodes}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {errorCodes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {errorCodes.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Settings className="w-4 h-4 text-accent" />
            <span>TECHNISCHE PARAMETER</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-primary">HARDWARE SPEZIFIKATIONEN</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prozessor:</span>
                  <span className="font-mono">ARM Cortex-M4 @ 168MHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Flash Speicher:</span>
                  <span className="font-mono">2048 KB (92% belegt)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RAM:</span>
                  <span className="font-mono">192 KB (78% belegt)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">EEPROM:</span>
                  <span className="font-mono">16 KB (45% belegt)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Betriebstemperatur:</span>
                  <span className="font-mono">67°C (Normal)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-primary">DURCHGEFÜHRTE TESTS</h4>
              <div className="space-y-2">
                {protocolData.testResults.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.test}:</span>
                    <div className="flex items-center space-x-1">
                      {item.passed ? (
                        <CheckCircle className="w-3 h-3 text-chart-4" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-chart-5" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center space-x-2">
            <Wrench className="w-4 h-4 text-accent" />
            <span>EMPFEHLUNGEN & MASSNAHMEN</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {protocolData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-sm">
                {rec.type === "success" ? (
                  <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-chart-5 mt-0.5 flex-shrink-0" />
                )}
                <div className="text-xs flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={rec.title}
                        onChange={(e) => updateRecommendation(index, "title", e.target.value)}
                        className="font-semibold text-xs h-6"
                        placeholder="Titel"
                      />
                      <Textarea
                        value={rec.description}
                        onChange={(e) => updateRecommendation(index, "description", e.target.value)}
                        className="text-xs min-h-[60px]"
                        placeholder="Beschreibung"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="font-semibold">{rec.title}</div>
                      <div className="text-muted-foreground">{rec.description}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="bg-card border border-border rounded-sm p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>© 2024 ECU Diagnostics Pro</span>
            <span>•</span>
            <span>Zertifiziert nach ISO 14229</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-3 h-3" />
            <span>
              Protokoll generiert: {currentDate} {currentTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
