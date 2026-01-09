/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Check,
  X,
  Ban,
  User,
  Calendar,
  FileText,
  Car,
  AlertTriangle,
  Eye,
  EyeOff,
  ZoomIn
} from "lucide-react";
import { BlockPickerModel, RejectPickerModel } from "@/services/admin/picker/model/picker.model";
import { PickerEntity } from "@/services/admin/picker/entity/list-all-picker-entity";
// Date formatting helper
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} de ${month}, ${year}`;
};

interface PickerManagementProps {
  picker: PickerEntity;
  onAccept: (pickerId: string) => void;
  onReject: (data: RejectPickerModel) => void;
  onBlock: (data: BlockPickerModel) => void;
  isLoading?: boolean;
}

type ActionType = 'accept' | 'reject' | 'block' | null;

// Mensajes predefinidos
const PREDEFINED_REASONS = {
  reject: [
    "Documento de identidad no legible o borroso",
    "Certificado de antecedentes vencido o no válido", 
    "Foto de perfil no cumple con los requisitos",
    "Información personal incompleta",
    "Documentos no corresponden a la persona registrada",
    "Calidad de imagen insuficiente para verificación"
  ],
  block: [
    "Actividad sospechosa detectada",
    "Información falsa o fraudulenta",
    "Violación de términos y condiciones",
    "Reportes múltiples de otros usuarios",
    "Comportamiento inapropiado",
    "Documentos falsificados"
  ]
};

export default function PickerManagement({
  picker,
  onAccept = () => {},
  onReject = () => {},
  onBlock = () => {},
  isLoading = false
}: PickerManagementProps) {
  const [actionType, setActionType] = useState<ActionType>(null);
  const [reason, setReason] = useState("");
  const [selectedInvalidDocs, setSelectedInvalidDocs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [imageViewMode, setImageViewMode] = useState<{[key: string]: 'thumbnail' | 'full'}>({});

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'blocked': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobado';
      case 'rejected': return 'Rechazado';
      case 'blocked': return 'Bloqueado';
      default: return status;
    }
  };

  const handleAction = async () => {
    if (!actionType) return;

    setIsSubmitting(true);

    try {
      switch (actionType) {
        case 'accept':
          await onAccept(picker.userId);
          break;
        case 'reject':
          await onReject({
            pickerId: picker.userId,
            reason,
            invalidDocuments: selectedInvalidDocs
          });
          break;
        case 'block':
          await onBlock({
            pickerId: picker.userId,
            reason
          });
          break;
      }

      // Reset form
      setActionType(null);
      setReason("");
      setSelectedInvalidDocs([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDialog = () => {
    setActionType(null);
    setReason("");
    setSelectedInvalidDocs([]);
  };

  const isActionDisabled = (action: string) => {
    const status = picker.status.toLowerCase();
    switch (action) {
      case 'accept':
        return status !== 'pending';
      case 'reject':
        return status !== 'pending';
      case 'block':
        return status === 'blocked';
      default:
        return false;
    }
  };

  const toggleImageView = (docId: string) => {
    setImageViewMode(prev => ({
      ...prev,
      [docId]: prev[docId] === 'full' ? 'thumbnail' : 'full'
    }));
  };

  const toggleDocExpanded = (docId: string) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  const isPDF = (url: string) => url.toLowerCase().includes('pdf');

  const approvedDocsCount = picker.profile.documents.filter(doc => doc.approved).length;
  const totalDocsCount = picker.profile.documents.length;

  return (
    <div className="space-y-6 mt-6">
      {/* Header con información básica */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={picker.profile?.pictureUrl || ''} />
                <AvatarFallback className="text-lg font-semibold">
                  {picker.profile.name[0]}{picker.profile.lastname[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">
                  {picker.profile.name} {picker.profile.lastname}
                </CardTitle>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>ID: {picker.id}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Registrado: {formatDate(picker.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Badge className={getStatusColor(picker.status)}>
              {getStatusLabel(picker.status)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Documentos con vista inline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Documentos ({approvedDocsCount}/{totalDocsCount} aprobados)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {picker.profile.documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-4 ">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${doc.approved ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-medium">{doc.type.label}</p>
                      <p className="text-sm text-muted-foreground">{doc.document.originalName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={doc.approved ? "default" : "destructive"}>
                      {doc.approved ? "Aprobado" : "Pendiente"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleDocExpanded(doc.id)}
                    >
                      {expandedDoc === doc.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {/* Vista expandida del documento */}
                {expandedDoc === doc.id && (
                  <div className="p-4 border-t">
                    {isPDF(doc.document.url) ? (
                      <div className="bg-gray-100 p-8 rounded-lg text-center">
                        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4">Documento PDF - {doc.document.originalName}</p>
                        <Button
                          onClick={() => window.open(doc.document.url, '_blank')}
                          variant="outline"
                        >
                          Abrir PDF
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Vista de imagen:</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleImageView(doc.id)}
                          >
                            <ZoomIn className="h-4 w-4 mr-1" />
                            {imageViewMode[doc.id] === 'full' ? 'Vista pequeña' : 'Vista completa'}
                          </Button>
                        </div>
                        <div className="flex justify-center">
                          <img
                            src={doc.document.url}
                            alt={doc.type.label}
                            className={`rounded-lg border ${
                              imageViewMode[doc.id] === 'full' 
                                ? 'max-w-full h-auto' 
                                : 'max-w-sm max-h-48 object-contain'
                            }`}
                            onClick={() => toggleImageView(doc.id)}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vehículos */}
      {picker.vehicles && picker.vehicles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5" />
              <span>Vehículos ({picker.vehicles.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {picker.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{vehicle.type}</p>
                    {vehicle.description && (
                      <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                    )}
                  </div>
                  <Badge variant={vehicle.isSelected ? "default" : "secondary"}>
                    {vehicle.isSelected ? "Seleccionado" : "Disponible"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Razón de estado actual */}
      {picker.statusReason && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Razón del Estado Actual</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700">{picker.statusReason}</p>
          </CardContent>
        </Card>
      )}

      {/* Acciones - Botones más grandes para mobile */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones de Gestión</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={() => setActionType('accept')}
              disabled={isActionDisabled('accept') || isLoading}
              className="bg-green-600 hover:bg-green-700 h-12 text-base font-medium"
              size="lg"
            >
              <Check className="h-5 w-5 mr-2" />
              Aceptar
            </Button>

            <Button
              variant="destructive"
              onClick={() => setActionType('reject')}
              disabled={isActionDisabled('reject') || isLoading}
              className="h-12 text-base font-medium"
              size="lg"
            >
              <X className="h-5 w-5 mr-2" />
              Rechazar
            </Button>

            <Button
              variant="secondary"
              onClick={() => setActionType('block')}
              disabled={isActionDisabled('block') || isLoading}
              className="h-12 text-base font-medium"
              size="lg"
            >
              <Ban className="h-5 w-5 mr-2" />
              Bloquear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog optimizado para mobile */}
      <Dialog open={actionType !== null} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {actionType === 'accept' && 'Confirmar Aceptación'}
              {actionType === 'reject' && 'Rechazar Reciclador'}
              {actionType === 'block' && 'Bloquear Reciclador'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'accept' &&
                '¿Estás seguro de que deseas aceptar a este reciclador?'
              }
              {actionType === 'reject' &&
                'Selecciona documentos problemáticos y/o elige una razón predefinida.'
              }
              {actionType === 'block' &&
                'Selecciona una razón de bloqueo o describe una personalizada.'
              }
            </DialogDescription>
          </DialogHeader>

          {(actionType === 'reject' || actionType === 'block') && (
            <div className="space-y-4">
              {actionType === 'reject' && (
                <div>
                  <Label className="text-sm font-medium">Documentos problemáticos:</Label>
                  <div className="mt-2 space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                    {picker.profile.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={doc.id}
                          checked={selectedInvalidDocs.includes(doc.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedInvalidDocs([...selectedInvalidDocs, doc.id]);
                            } else {
                              setSelectedInvalidDocs(selectedInvalidDocs.filter(id => id !== doc.id));
                            }
                          }}
                        />
                        <Label htmlFor={doc.id} className="text-sm flex-1">
                          {doc.type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Razones predefinidas */}
              <div>
                <Label className="text-sm font-medium">
                  Razones predefinidas:
                </Label>
                <div className="mt-2 grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {PREDEFINED_REASONS[actionType as 'reject' | 'block'].map((predefinedReason, index) => (
                    <Button
                      key={index}
                      variant={reason === predefinedReason ? "default" : "outline"}
                      size="sm"
                      className="justify-start text-left h-auto py-2 px-3 whitespace-normal"
                      onClick={() => setReason(reason === predefinedReason ? "" : predefinedReason)}
                    >
                      {predefinedReason}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Razón personalizada */}
              <div>
                <Label htmlFor="reason" className="text-sm font-medium">
                  Razón personalizada (opcional):
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Escribe una razón personalizada si es necesario..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={closeDialog} 
              disabled={isSubmitting || isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAction}
              disabled={isSubmitting || isLoading || (actionType !== 'accept' && !reason.trim())}
              className={`flex-1 ${
                actionType === 'accept'
                  ? "bg-green-600 hover:bg-green-700"
                  : actionType === 'reject'
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {(isSubmitting || isLoading) ? 'Procesando...' :
                actionType === 'accept' ? 'Aceptar' :
                  actionType === 'reject' ? 'Rechazar' :
                    'Bloquear'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}