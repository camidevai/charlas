# Configuración de EmailJS para el Formulario de Contacto

## ✅ Estado: CONFIGURADO Y LISTO

El formulario de contacto ya está completamente configurado con las credenciales de EmailJS desde el archivo `.env`:

- **Service ID:** `service_t0cvv27`
- **Template ID:** `template_lh7gtfd`
- **Public Key:** `1aZEaVP20Ayfhpkp0`

## 🎯 Funcionalidades Activas

- ✅ Envío real de emails
- ✅ Validación completa de formulario
- ✅ Estados visuales (loading, success, error)
- ✅ Diseño responsivo
- ✅ Variables de entorno configuradas

---

## 📚 Referencia: Pasos de Configuración (YA COMPLETADOS)

### 1. Crear Cuenta en EmailJS
- Visita [https://www.emailjs.com/](https://www.emailjs.com/)
- Regístrate con tu email
- Confirma tu cuenta

### 2. Configurar Servicio de Email
- Ve a **Email Services** en el dashboard
- Haz clic en **Add New Service**
- Selecciona tu proveedor (Gmail, Outlook, etc.)
- Sigue las instrucciones para conectar tu email
- **Anota el Service ID** (ejemplo: `service_abc123`)

### 3. Crear Template de Email
- Ve a **Email Templates**
- Haz clic en **Create New Template**
- Usa este template de ejemplo:

```
Asunto: Nuevo contacto desde tu presentación - {{from_name}}

Hola,

Has recibido un nuevo mensaje de contacto desde tu presentación:

👤 Nombre: {{from_name}}
🏢 Empresa/Marca: {{brand_name}}
📧 Email: {{reply_to}}

💬 Mensaje:
{{message}}

---
Enviado desde la presentación "Historia de la Inteligencia Artificial"
```

- **Variables requeridas:** `from_name`, `brand_name`, `reply_to`, `message`
- **Anota el Template ID** (ejemplo: `template_xyz789`)

### 4. Obtener Public Key
- Ve a **Account** → **General**
- Copia tu **Public Key**

### 5. Actualizar la Configuración
Edita el archivo `index.html` y reemplaza:

```javascript
const publicKey = "demo_public_key"; // ← Cambiar por tu clave real
```

Por:

```javascript
const publicKey = "TU_PUBLIC_KEY_AQUI"; // ← Tu clave real de EmailJS
```

### 6. Verificar Service ID y Template ID
En `AIToolsSection.jsx`, verifica que coincidan:

```javascript
await emailjs.sendForm(
  'service_abc123',    // ← Tu Service ID
  'template_xyz789',   // ← Tu Template ID
  formRef.current
)
```

## ✅ Verificación

Una vez configurado:
1. El formulario enviará emails reales
2. No aparecerán errores en la consola
3. Recibirás los mensajes en tu email configurado

## 🔧 Para Desarrollo Local

Si solo quieres probar la interfaz sin enviar emails reales, el formulario mostrará los estados visuales correctos pero no enviará emails hasta que configures EmailJS completamente.
