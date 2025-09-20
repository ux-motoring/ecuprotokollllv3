"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"

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

export function InspectionProtocol() {
  const currentDate = new Date().toLocaleDateString("de-DE")
  const currentTime = new Date().toLocaleTimeString("de-DE")

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 font-mono">
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
            <div className="font-bold">ECU-{Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Fahrzeug:</span>
            <div className="font-bold">BMW 320d E90</div>
          </div>
          <div>
            <span className="text-muted-foreground">Steuergerät:</span>
            <div className="font-bold">DME 8506924</div>
          </div>
          <div>
            <span className="text-muted-foreground">Techniker:</span>
            <div className="font-bold">System Auto</div>
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
            <div className="text-2xl font-bold text-chart-4">FUNKTIONSFÄHIG</div>
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
            <div className="text-2xl font-bold text-accent">94.2%</div>
            <Progress value={94.2} className="mt-2" />
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
            <div className="text-2xl font-bold text-chart-2">13.4V</div>
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
                {[
                  { test: "Kommunikationstest", status: "BESTANDEN", icon: CheckCircle, color: "text-chart-4" },
                  { test: "Speicher-Integrität", status: "BESTANDEN", icon: CheckCircle, color: "text-chart-4" },
                  { test: "Sensor-Kalibrierung", status: "BESTANDEN", icon: CheckCircle, color: "text-chart-4" },
                  { test: "Aktuator-Test", status: "WARNUNG", icon: AlertTriangle, color: "text-chart-5" },
                  { test: "Fehlercode-Analyse", status: "BESTANDEN", icon: CheckCircle, color: "text-chart-4" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.test}:</span>
                    <div className="flex items-center space-x-1">
                      <item.icon className={`w-3 h-3 ${item.color}`} />
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
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-sm">
              <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-semibold">Steuergerät funktionsfähig</div>
                <div className="text-muted-foreground">
                  Alle kritischen Systeme arbeiten innerhalb der Spezifikationen.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-muted rounded-sm">
              <AlertTriangle className="w-4 h-4 text-chart-5 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-semibold">Aktuator-Kalibrierung empfohlen</div>
                <div className="text-muted-foreground">
                  Geringfügige Abweichungen bei Stellglied-Ansteuerung festgestellt. Kalibrierung in 6 Monaten
                  empfohlen.
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-muted rounded-sm">
              <CheckCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-semibold">Software aktuell</div>
                <div className="text-muted-foreground">Firmware Version 2.1.4 ist die neueste verfügbare Version.</div>
              </div>
            </div>
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
